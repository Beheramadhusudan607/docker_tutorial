from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # This will allow the frontend to make requests to the backend

@app.route('/submit', methods=['POST'])
def submit():
    """
    Handles form submission from the frontend.
    """
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        email = data.get('email')

        if not name or not email:
            return jsonify({'error': 'Missing name or email'}), 400

        # Process the data (e.g., save to a database)
        print(f"Received data: Name - {name}, Email - {email}")

        return jsonify({'message': f'Hello, {name}! Your form has been submitted successfully.'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
