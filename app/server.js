require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const apiKey = process.env.API_KEY;

// Enable CORS for all routes
app.use(cors());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Make the uploaded images accessible through /uploads URL
app.use('/uploads', express.static('uploads')); // Add this line

// Middleware for parsing JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'), // Directory for uploaded files
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// API Route: Search for recipes
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

// API Route: Fetch single recipe details
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

// API Route: Handle profile picture uploads
app.post('/upload-profile-picture', upload.single('profileImage'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }
    const imagePath = `/uploads/${req.file.filename}`;
    res.json({ success: true, imagePath });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
