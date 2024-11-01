// Your Spoonacular API Key
const apiKey = 'a9d1fc1b28744e9eba0e2e3382db9a3a';

// Function to get recipe by search query
async function getRecipe(query) {
  const url = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}&number=1&addRecipeInformation=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const recipe = data.results[0]; // Get the first recipe result
    const ingredients = recipe.extendedIngredients.map(ingredient => ingredient.original);
    const steps = recipe.analyzedInstructions[0].steps.map(step => step.step);

    console.log('Ingredients:', ingredients);
    console.log('Steps:', steps);

    return { ingredients, steps };

  } catch (error) {
    console.error('Error fetching recipe:', error);
  }
}

// // Example usage
// getRecipe('spaghetti bolognese');
