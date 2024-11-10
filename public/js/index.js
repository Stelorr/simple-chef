// Function to fetch and display search results from your server API
function fetchSearchResults() {
    const searchQuery = new URLSearchParams(window.location.search).get('query');
    if (searchQuery) {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '<p>Loading recipes...</p>';

        // Fetch from your own server endpoint
        fetch(`/api/search?query=${searchQuery}`)
            .then(response => response.json())
            .then(data => {
                resultsDiv.innerHTML = ''; // Clear loading text
                if (data.results.length > 0) {
                    data.results.forEach(recipe => {
                        const recipeDiv = document.createElement('div');
                        recipeDiv.classList.add('recipe');
                        recipeDiv.innerHTML = `
                            <h3><a href="recipe.html?id=${recipe.id}">${recipe.title}</a></h3>
                            <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; border-radius: 5px;">
                        `;
                        resultsDiv.appendChild(recipeDiv);
                    });
                } else {
                    resultsDiv.innerHTML = '<p>No recipes found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                resultsDiv.innerHTML = '<p>Error fetching recipes.</p>';
            });
    }
}

// Function to display the fetched recipe details with swipeable steps
function displayRecipe(recipe) {
    const recipeDetailsDiv = document.getElementById('recipe-details');
    recipeDetailsDiv.innerHTML = '';

    // Add the recipe title and image
    recipeDetailsDiv.innerHTML = `
        <h2>${recipe.title}</h2>
        <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; border-radius: 5px;">
    `;

    // Create carousel container for steps
    const carouselContainer = document.createElement('div');
    carouselContainer.classList.add('carousel-container');
    
    const carouselWrapper = document.createElement('div');
    carouselWrapper.classList.add('carousel-wrapper');
    
    const steps = recipe.analyzedInstructions[0].steps;

    steps.forEach((step, index) => {
        const stepCard = document.createElement('div');
        stepCard.classList.add('step-card');
        stepCard.innerHTML = `
            <h2>Step ${step.number}</h2>
            <p>${step.step}</p>
        `;

        // Check if the step is timed (assuming you have a property for duration in seconds)
        if (step.length && step.length.number) {
            const timerButton = document.createElement('button');
            timerButton.textContent = `Start ${step.length.number}-minute timer`;
            timerButton.addEventListener('click', () => startTimer(step.length.number, `timer-display-${index}`));

            const timerDisplay = document.createElement('span');
            timerDisplay.id = `timer-display-${index}`;

            stepCard.appendChild(timerButton);
            stepCard.appendChild(timerDisplay);
        }

        carouselWrapper.appendChild(stepCard);
    });

    carouselContainer.appendChild(carouselWrapper);
    recipeDetailsDiv.appendChild(carouselContainer);

    // Add navigation buttons for swiping
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&larr;';
    prevButton.classList.add('carousel-button', 'prev');
    prevButton.addEventListener('click', showPrevStep);
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&rarr;';
    nextButton.classList.add('carousel-button', 'next');
    nextButton.addEventListener('click', showNextStep);

    recipeDetailsDiv.appendChild(prevButton);
    recipeDetailsDiv.appendChild(nextButton);

    let currentStepIndex = 0;

    // Function to swipe to the previous step
    function showPrevStep() {
        if (currentStepIndex > 0) {
            markAsComplete(currentStepIndex - 1); // Mark current card as complete
            currentStepIndex--;
            updateCarousel();
        }
    }

    // Function to swipe to the next step
    function showNextStep() {
        if (currentStepIndex < steps.length - 1) {
            markAsComplete(currentStepIndex); // Mark current card as complete
            currentStepIndex++;
            updateCarousel();
        }
    }

    // Function to update carousel view
    function updateCarousel() {
        const cardWidth = carouselContainer.offsetWidth;
        const offset = -currentStepIndex * cardWidth;
        carouselWrapper.style.transform = `translateX(${offset}px)`;
    }

    // Function to mark the card as complete
    function markAsComplete(index) {
        const stepCard = carouselWrapper.children[index];
        stepCard.classList.add('completed'); // Add a class to mark the card as completed
    }

    // Initialize the first step view
    updateCarousel();
}

// Timer function
function startTimer(minutes, displayId) {
    let seconds = minutes * 60;
    const display = document.getElementById(displayId);

    const interval = setInterval(() => {
        let min = Math.floor(seconds / 60);
        let sec = seconds % 60;
        sec = sec < 10 ? '0' + sec : sec;

        display.textContent = `${min}:${sec}`;

        if (seconds-- <= 0) {
            clearInterval(interval);
            display.textContent = "Time's up!";
        }
    }, 1000);
}

// Function to fetch and display recipe details from your server API
function fetchRecipeDetails() {
    const recipeId = new URLSearchParams(window.location.search).get('id');
    if (recipeId) {
        const recipeDetailsDiv = document.getElementById('recipe-details');
        recipeDetailsDiv.innerHTML = '<p>Loading recipe details...</p>';

        // Fetch from your own server endpoint
        fetch(`/api/recipe/${recipeId}`)
            .then(response => response.json())
            .then(recipeData => {
                displayRecipe(recipeData); // Call the function to display the recipe with swiping
            })
            .catch(error => {
                console.error('Error fetching recipe details:', error);
                recipeDetailsDiv.innerHTML = '<p>Error loading recipe details.</p>';
            });
    }
}

// Run page-specific code depending on the URL
if (window.location.pathname.includes('index.html')) {
    // Index page: search functionality
    document.getElementById('searchButton').addEventListener('click', () => {
        const searchQuery = document.getElementById('search').value;
        if (searchQuery) {
            window.location.href = `search-results.html?query=${encodeURIComponent(searchQuery)}`;
        }
    });
} else if (window.location.pathname.includes('search-results.html')) {
    // Results page: fetch and display search results
    fetchSearchResults();
} else if (window.location.pathname.includes('recipe.html')) {
    // Recipe page: fetch and display recipe details
    fetchRecipeDetails();
}
