const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const { name, email } = req.body;
        
        // The URL of the Flask backend service as defined in docker-compose.yaml
        const flaskBackendUrl = 'http://backend:5000/submit';

        const response = await axios.post(flaskBackendUrl, { name, email });

        res.json(response.data);
    } catch (error) {
        console.error('Error submitting form:', error.message);
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// Route to serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Frontend server listening at http://localhost:${port}`);
});
// Export the app for testing purposes
module.exports = app;   