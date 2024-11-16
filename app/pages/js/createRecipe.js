// ? create recipe 

document.addEventListener('DOMContentLoaded', () => {
    const recipeForm = document.getElementById('recipeForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const recipeGallery = document.getElementById('recipeGallery');
    
    // Load recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
            
    // Handle form submission
    recipeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newRecipe = {
            id: Date.now(),
            title: document.getElementById('title').value,
            description: document.getElementById('description').value,
            cookTime: document.getElementById('cookTime').value,
            servings: document.getElementById('servings').value,
            ingredients: document.getElementById('ingredients').value,
            instructions: document.getElementById('instructions').value
        };
        
        recipes.push(newRecipe);
        localStorage.setItem('recipes', JSON.stringify(recipes));
        
        recipeForm.reset();
        window.location.href = "http://localhost:3000/user-account.html"
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
    
});

function handleCancel(){
    window.location.href = "http://localhost:3000/user-account.html"
}