Task Management System

This is a full-stack Task Management System developed using Django REST Framework for the backend and React.js for the frontend. The application supports user authentication using JWT, task creation, task updates, task deletion, and task filtering based on status.

The project demonstrates integration between a REST API and a React frontend with protected routes and session handling.

--------------------------------------------------

Features

Authentication
- User registration
- User login using JWT authentication
- Logout functionality
- Protected dashboard access

Task Management
- Add new tasks
- Update task status (In Progress, Completed, Important)
- Delete tasks
- Filter tasks by status
- Task count display for each status

User Interface
- Dashboard view with task cards
- Profile dropdown displaying logged-in username
- Responsive layout using Bootstrap
- Clean and simple UI

--------------------------------------------------

Technology Stack

Frontend
- React.js
- React Router
- Axios
- Bootstrap
- Bootstrap Icons

Backend
- Django
- Django REST Framework
- Simple JWT
- MYSQL database

--------------------------------------------------

Project Setup

Backend Setup

1. Navigate to the backend directory
2. Create and activate a virtual environment
3. Install required dependencies
4. Apply database migrations
5. Create a superuser
6. Start the Django development server

The backend server runs on:
http://127.0.0.1:8000/

--------------------------------------------------

Frontend Setup

1. Navigate to the frontend directory
2. Install npm dependencies
3. Start the React development server

The frontend runs on:
http://localhost:3000/

--------------------------------------------------

API Endpoints

POST /api/v1/register/
Registers a new user

POST /api/v1/login/
Authenticates user and returns JWT token

GET /api/v1/tasks/
Fetch all tasks

POST /api/v1/tasks/
Create a new task

PUT /api/v1/tasks/{id}/
Update an existing task

DELETE /api/v1/tasks/{id}/
Delete a task

--------------------------------------------------

Implementation Details

- JWT tokens are stored in localStorage
- Logged-in user information is extracted from the JWT token
- Tasks are stored locally for frontend persistence
- Dashboard is accessible only after authentication
- Admin-created users and registered users can log in successfully

--------------------------------------------------

Author

Nihala Abdullah  
MCA Student  

--------------------------------------------------

Purpose

This project was developed as part of an academic assignment to demonstrate full-stack development using Django REST Framework and React.js.