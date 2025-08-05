# Full-Stack Application with Node.js Frontend and Flask Backend

This project demonstrates a full-stack application with a Node.js (Express) frontend and a Python (Flask) backend, containerized using Docker.

## Project Structure


.
├── backend
│   ├── app.py
│   └── Dockerfile
├── frontend
│   ├── public
│   │   └── index.html
│   ├── server.js
│   ├── package.json
│   └── Dockerfile
├── .gitignore
├── docker-compose.yaml
└── README.md


## How to Run

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    ```

2.  **Build and run the containers:**
    ```bash
    docker-compose up --build
    ```

3.  **Access the application:**
    * Frontend: [http://localhost:3000](http://localhost:3000)
    * Backend: The backend is accessible from the frontend container at `http://backend:5000`.

## Pushing to Docker Hub

1.  **Login to Docker Hub:**
    ```bash
    docker login
    ```

2.  **Tag and push the backend image:**
    ```bash
    docker tag <backend-image-id> your-dockerhub-username/backend-app
    docker push your-dockerhub-username/backend-app
    ```

3.  **Tag and push the frontend image:**
    ```bash
    docker tag <frontend-image-id> your-dockerhub-username/frontend-app
    docker push your-dockerhub-username/frontend-app
    ```

## Pushing to GitHub

1.  **Initialize a Git repository:**
    ```bash
    git init
    ```

2.  **Add the files and commit:**
    ```bash
    git add .
    git commit -m "Initial commit"
    ```

3.  **Add your remote repository and push:**
    ```bash
    git remote add origin <your-github-repo-url>
    git push -u origin main
    ```
