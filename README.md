# Description

A Learning Management System (LMS) built with a Django backend and a React + Vite frontend. This project allows users to manage courses, enrollments, profiles, and more. This can be viewed by clicking [here](https://lms-frontendd.netlify.app/). If you wish to view everything in more detail, download lms-frontend and lms-backend and follow the instructions in [Backend Setup](#backend-setup) and [Frontend Setup](#frontend-setup)

## Table of Contents
- [Features](#features)
- [Deployment](#deployment)
- [Frontend Setup](#frontend-setup)
- [Database](#database)
- [Development](#development)
- [Extra Information](#extra-information)


## Features
- User authentication and profile management
- Course creation, editing, and enrollment along with user managing, depending on the role
- Dashboard for students, teachers and admins
- Profile saving
- Accesible on mobile devices 
- Support page

## Project Structure
```
lms-project/
├── lms-backend/      # Django backend + SQLite
├── lms-frontend/     # React + Vite frontend
├── others
```


## Local Setup

To run the LMS locally, use the `lms-local` folder structure. This will allow you to run both the backend and frontend entirely on your machine. As this is the local set-up, it is faster, but it is separated from the deployed version.

### Backend (Django)
1. Open a terminal and navigate to the backend directory:
	```
	cd lms-local/local-backend/lms-backend
	```
2. (Optional) Create and activate a Python virtual environment:
	```
	python -m venv .venv
	.venv\Scripts\activate  # On Windows
	```
3. Install dependencies:
	```
	pip install -r requirements.txt
	```
4. Apply migrations (if needed):
	```
	python manage.py migrate
	```
5. (Optional) Create a superuser:
	```
	python manage.py createsu
	```
	This will create a superuser with:
	- Username: admin
	- Email: admin@example.com
	- Password: yourpassword
6. Start the backend server:
	```
	python manage.py runserver
	```
	The backend will be available at http://localhost:8000

### Frontend (React + Vite)
1. Open a new terminal and navigate to the frontend directory:
	```
	cd lms-local/local-frontend/lms-frontend
	```
2. Install dependencies:
	```
	npm install
	```
3. Start the frontend development server:
	```
	npm run dev
	```
	The frontend will be available at http://localhost:5173

### Accessing the App
- Visit http://localhost:5173 in your browser.
- Log in with the superuser credentials above or register a new account.

---

## Deployment
The web application is already deployed and can be accessed at [lms-frontendd.netlify.app](https://lms-frontendd.netlify.app/). This is the same link as the one in [description](#description).

## Web Server and Database
- The backend uses SQLite (`lms.db`).
- Migrations are managed via Django.
- Web server deployed on Render. [Here.](https://lms-backend-qeui.onrender.com)
- Database deployed on Render. 

## Development
- Backend: Django REST Framework, custom management commands, migrations.
- Frontend: React, TypeScript, Vite, modular components and pages.
- Deployed on Netlify. [Web App Link](https://lms-frontendd.netlify.app/)

## Extra Information
- The full database can be seen in admin dashboard by logging into a admin account.
- It is normal to not get anything since the Web Server acts simply connects the frontend to the database.
- The web app could not function right away, this simply means the server isn't up, just wait for the server to start up and everything should work.
- The deployed version and local version are not synched together since they run on different places.