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
                recipeDetailsDiv.innerHTML = ''; // Clear loading text
                recipeDetailsDiv.innerHTML = `
                    <h2>${recipeData.title}</h2>
                    <img src="${recipeData.image}" alt="${recipeData.title}" style="width: 100%; border-radius: 5px;">
                    <h3>Ingredients</h3>
                    <ul>
                        ${recipeData.extendedIngredients.map(ingredient => `
                            <li>${ingredient.original}</li>`).join('')}
                    </ul>
                    <h3>Instructions</h3>
                    <ol>
                        ${recipeData.analyzedInstructions[0].steps.map(step => `
                            <li>${step.step}</li>`).join('')}
                    </ol>
                `;
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
