# backend/app.py

from Flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize the Flask application
app = Flask(__name__)
# Enable Cross-Origin Resource Sharing (CORS) to allow requests from the frontend
CORS(app)

@app.route('/')
def index():
    """
    A simple route to confirm the backend is running.
    """
    return "Flask Backend is running!"

@app.route('/submit', methods=['POST'])
def handle_submission():
    """
    This route handles the form submission from the frontend.
    It expects a JSON payload with 'name' and 'email'.
    """
    # Check if the request contains JSON data
    if not request.is_json:
        return jsonify({"error": "Missing JSON in request"}), 400

    # Get the JSON data from the request
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')

    # Basic validation
    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    # Process the data (in a real app, you might save this to a database)
    print(f"Received data: Name - {name}, Email - {email}")

    # Send a success response back to the frontend
    response_message = f"Hello, {name}! Your form was submitted successfully with the email {email}."
    return jsonify({"message": response_message})

# Run the Flask app
if __name__ == '__main__':
    # Listen on all available network interfaces and port 5000
    app.run(host='0.0.0.0', port=5000, debug=True)
# This allows the app to be run directly with `python app.py`   