// frontend/server.js

const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');

// Create an Express application
const app = express();
const PORT = 3000;

// --- Middleware ---
// Serve static files (HTML, CSS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (for API clients)
app.use(bodyParser.json());

// --- Routes ---
// Route to serve the main HTML form page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to handle form submission
app.post('/submit-form', async (req, res) => {
    try {
        const { name, email } = req.body;

        // The URL for the Flask backend service as defined in docker-compose.yml
        // Docker's internal DNS will resolve 'flask-backend' to the correct container IP
        const flaskBackendUrl = 'http://flask-backend:5000/submit';

        console.log(`Forwarding request to Flask backend at: ${flaskBackendUrl}`);

        // Make a POST request to the Flask backend
        const response = await axios.post(flaskBackendUrl, {
            name: name,
            email: email
        });

        // Send the response from the Flask backend back to the client's browser
        res.send(`
            <div style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
                <h2>Response from Backend</h2>
                <p style="background-color: #e7f4e7; border: 1px solid #c8e6c9; padding: 15px; border-radius: 5px;">
                    ${response.data.message}
                </p>
                <a href="/">Go Back</a>
            </div>
        `);

    } catch (error) {
        console.error("Error submitting form: ", error.message);
        // Handle potential errors, like the backend being down
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error Data:', error.response.data);
            console.error('Error Status:', error.response.status);
            res.status(500).send(`Error from backend: ${error.response.data.error || 'Something went wrong'}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Error Request:', error.request);
            res.status(500).send('Could not connect to the backend service. Please try again later.');
        } else {
            // Something happened in setting up the request that triggered an Error
            res.status(500).send('An internal error occurred.');
        }
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Node.js frontend server is running on http://localhost:${PORT}`);
});
