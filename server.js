require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors'); // CORS handling

// Use dynamic import to bring in `node-fetch`
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const apiKey = process.env.API_KEY;

// Enable CORS for all routes
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle recipe search
app.get('/api/search', (req, res) => {
    const query = req.query.query;
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => res.json(data))
        .catch(error => {
            console.error('Error fetching search results:', error);
            res.status(500).json({ error: 'Failed to fetch search results' });
        });
});

// Route to handle fetching a single recipe
app.get('/api/recipe/:id', (req, res) => {
    const recipeId = req.params.id;
    const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => res.json(data))
        .catch(error => {
            console.error('Error fetching recipe details:', error);
            res.status(500).json({ error: 'Failed to fetch recipe details' });
        });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

