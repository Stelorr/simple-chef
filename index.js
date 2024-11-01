// API Key
const apiKey = 'a9d1fc1b28744e9eba0e2e3382db9a3a'; 

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
                    <h3><a href="https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}" target="_blank">${recipe.title}</a></h3>
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
