function handleClick (){
    window.location.href = "http://localhost:3000/createRecipe.html"
}

// ? create recipe 

document.addEventListener('DOMContentLoaded', () => {
    const createBtn = document.getElementById('createBtn');
    const recipeForm = document.getElementById('recipeForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const recipeGallery = document.getElementById('recipeGallery');
    
    let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');

    // Display existing recipes
    function displayRecipes(recipes) {
        recipeGallery.innerHTML = recipes.map(recipe => `
            <div class="recipe-card">
                <img src="https://via.placeholder.com/300x200" alt="${recipe.title}" class="recipe-image">
                <div class="recipe-content">
                    <h3 class="recipe-title">${recipe.title}</h3>
                    <p class="recipe-description">${recipe.description}</p>
                    <div class="recipe-meta">
                        <span>⏰ ${recipe.cookTime}</span>
                        <span>👥 ${recipe.servings} servings</span>
                    </div>
                    <button class="view-btn" onclick="viewRecipe(${recipe.id})">View Recipe</button>
                    <button class="delete-btn" onclick="deleteRecipe(${recipe.id})">Delete Recipe</button>
                </div>
            </div>
        `).join('');
    }
    
    // Show create form
    createBtn.addEventListener('click', () => {
    });
        
    
    // View recipe details
    window.viewRecipe = (id) => {
        const recipe = recipes.find(r => r.id === id);
        if (recipe) {
            alert(`
                ${recipe.title}
                
                Description: ${recipe.description}
                
                Cooking Time: ${recipe.cookTime}
                Servings: ${recipe.servings}
                
                Ingredients:
                ${recipe.ingredients}
                
                Instructions:
                ${recipe.instructions}
            `);
        }
    };
    
    window.deleteRecipe = (id) => {
        const newRecipes = recipes.filter((recipe) => recipe.id !== id);
        localStorage.setItem('recipes', JSON.stringify(newRecipes));
        displayRecipes(newRecipes);
    }

    // Initial display of recipes
    displayRecipes(recipes);
});