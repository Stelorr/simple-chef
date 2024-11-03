// API Key
const apiKey = 'a9d1fc1b28744e9eba0e2e3382db9a3a'; 

let timerActive = false; // Flag to check if a timer is already running
let currentTimer; // To store the current timer

// Fetch and display recipe details (ingredients, steps, and timers)
async function getRecipeDetails(recipeId) {
    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`);
        const recipeData = await response.json();
        displayRecipeDetails(recipeData);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
    }
}

// Display recipe ingredients, steps, checkboxes, and timer option
function displayRecipeDetails(recipe) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results to display the new recipe details

    // Create a container for the recipe details
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe-details');

    // Display recipe title
    recipeDiv.innerHTML = `<h2>${recipe.title}</h2>`;

    // Create a list of ingredients with checkboxes
    const ingredientsList = document.createElement('ul');
    ingredientsList.classList.add('ingredients-list');
    recipe.extendedIngredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="ingredient-${ingredient.id}">
            <label for="ingredient-${ingredient.id}">${ingredient.original}</label>
        `;
        ingredientsList.appendChild(li);
    });
    recipeDiv.appendChild(ingredientsList);

    // Create a list of steps with checkboxes
    const stepsList = document.createElement('ul');
    stepsList.classList.add('steps-list');
    recipe.analyzedInstructions[0].steps.forEach(step => {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" id="step-${step.number}">
            <label for="step-${step.number}">${step.step}</label>
            ${step.length ? `<button class="timer-btn" onclick="startTimer(${step.length.number}, this)">Start Timer (${step.length.number} minutes)</button>` : ''}
        `;
        stepsList.appendChild(li);
    });
    recipeDiv.appendChild(stepsList);

    resultsDiv.appendChild(recipeDiv);
}

// Update startTimer to show the timer in a prominent spot
function startTimer(minutes, button) {
    if (timerActive) {
        alert("A timer is already running. Please wait until it finishes.");
        return; // Do not start another timer
    }

    timerActive = true;
    button.disabled = true;

    if (currentTimer) {
        clearInterval(currentTimer);
        document.querySelector('.timer')?.remove();
    }

    const timerDiv = document.createElement('div');
    timerDiv.classList.add('timer');
    document.body.appendChild(timerDiv); // Append to body for prominence

    let timeLeft = minutes * 60; // convert minutes to seconds

    currentTimer = setInterval(() => {
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;
        timerDiv.textContent = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            timerDiv.textContent = 'Time\'s up!';
            alert('Time\'s up!');
            timerActive = false;
            button.disabled = false;
        }

        timeLeft--;
    }, 1000);
}


// Fetch search results and display them
document.getElementById('searchButton').addEventListener('click', async () => {
    const searchQuery = document.getElementById('search').value;
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchQuery}&apiKey=${apiKey}`);
        const data = await response.json();
        
        if (data.results.length > 0) {
            data.results.forEach(recipe => {
                const recipeDiv = document.createElement('div');
                recipeDiv.classList.add('recipe');
                recipeDiv.innerHTML = `
                    <h3><a href="#" onclick="getRecipeDetails(${recipe.id})">${recipe.title}</a></h3>
                    <img src="${recipe.image}" alt="${recipe.title}" style="width: 100%; border-radius: 5px;">
                `;
                resultsDiv.appendChild(recipeDiv);
            });
        } else {
            resultsDiv.innerHTML = '<p>No recipes found.</p>';
        }
    } catch (error) {
        console.error('Error fetching recipes:', error);
        resultsDiv.innerHTML = '<p>Error fetching recipes.</p>';
    }
});
