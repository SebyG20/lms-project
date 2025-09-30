### Deployed API Tests (Python)

You can run automated tests against the deployed backend API using Python and the `requests` library. Example tests are in `lms-backend/test_deployed_api.py`.

**To run deployed API tests:**

1. Make sure you have Python installed.
2. Install the `requests` library if you don't have it:
	```
	pip install requests
	```
3. Run the test script:
	```
	python test_deployed_api.py
	```
	This will check the deployed API health and students endpoints. You should see output like:
	```
	API health endpoint OK
	API students endpoint OK
	```

If any test fails, you'll see an AssertionError or a failed HTTP status code.

---
## Automated Testing

### Backend (Django)

Automated tests are provided for the backend using Django's test framework. Example tests are in `lms-backend/lms/tests_auto.py`.

**To run all backend tests:**

1. Open a terminal and navigate to the backend directory:
	```
	cd lms-backend
	```
2. Run the Django test suite:
	```
	python manage.py test
	```
	This will automatically discover and run all tests in files named `test*.py` (including `tests_auto.py`).

You should see output indicating the number of tests run and their results (OK, FAIL, or ERROR).

---
## Wireframes

The wireframes below are an example of the layout

### Login Page

```
-----------------------------
|        LMS Login          |
|---------------------------|
|  Email:  [___________]    |
|  Password: [_________]    |
|  [ Login ]   [ Register ] |
|---------------------------|
|                           |
-----------------------------
```

### Dashboard Page

```
---------------------------------------------------
| Navbar | Dashboard | Profile | Logout            |
---------------------------------------------------
| Welcome, [User]!                               |
|-------------------------------------------------|
| [ My Courses ]  [ Enrollments ]  [ Support ]    |
|-------------------------------------------------|
| Recent Activity / Announcements                |
---------------------------------------------------
```

### Course Page

```
---------------------------------------------------
| Navbar | Dashboard | Courses | Profile | Logout  |
---------------------------------------------------
| Course Title: [Course Name]                     |
| Description: [Course Description]               |
|-------------------------------------------------|
| [ Enroll ]  [ Edit ]  [ View Students ]         |
|-------------------------------------------------|
| Lessons / Materials / Assignments               |
---------------------------------------------------
```

### Profile Page

```
-----------------------------
|      Profile               |
|---------------------------|
| Name: [___________]        |
| Email: [___________]       |
| Role: [Student/Teacher]    |
|---------------------------|
| [ Edit Profile ]           |
-----------------------------
```

### Users Management (Admin)

```
---------------------------------------------------
| Navbar | Dashboard | Users | Profile | Logout    |
---------------------------------------------------
| Users Table:                                    |
|-------------------------------------------------|
| | ID | Name | Email | Role | Actions |          |
|-------------------------------------------------|
| |  1 | ...  | ...   | ...  | Edit/Delete |      |
|-------------------------------------------------|
| [ Add User ]                                    |
---------------------------------------------------
```
# Description

A Learning Management System (LMS) built with a Django backend and a React + Vite frontend. This project allows users to manage courses, enrollments, profiles, and more. This can be viewed by clicking [here](https://lms-frontendd.netlify.app/). If you wish to view everything in more detail, download lms-frontend and lms-backend and follow the instructions in [Backend Setup](#backend-setup) and [Frontend Setup](#frontend-setup)

## Table of Contents
- [Features](#features)
- [Deployment](#deployment)
- [Frontend Setup](#frontend-setup)
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

### How to Run Locally (Detailed)
To run the LMS locally, use the existing `lms-backend` and `lms-frontend` folders. You must update API calls in the frontend code to use your local backend server.

#### What You Need to Change for Local Development

1. **API URLs:**
	- In the frontend code (usually in `src/pages` or `src/components`), find all API calls that use a deployed URL (such as `https://lms-backend-qeui.onrender.com`).
	- Change these URLs to use your local backend: `http://localhost:8000`.
	- Example:
	  ```js
	  // Change this:
	  const API_BASE = 'https://lms-backend-qeui.onrender.com';
	  // To this:
	  const API_BASE = 'http://localhost:8000';
	  ```
	- You may also use an environment variable (like `VITE_API_BASE_URL`) and set it to `http://localhost:8000` for local development.

2. **Install Dependencies:**
	- For backend: `pip install -r requirements.txt` in `lms-backend`
	- For frontend: `npm install` in `lms-frontend`

3. **Run Servers Locally:**
	- Backend: `python manage.py runserver` (should run at `http://localhost:8000`)
	- Frontend: `npm run dev` (should run at `http://localhost:5173`)

4. **Check for Port Conflicts:**
	- Make sure nothing else is running on ports 8000 (backend) or 5173 (frontend).

5. **Database:**
	- The backend uses its own SQLite database (`lms.db`). No changes needed unless you want to reset or migrate.

6. **Environment Variables:**
	- If you use `.env` files, make sure they point to local URLs and settings.

7. **Troubleshooting:**
	- If you get errors about missing modules, run `npm install` or `pip install` again.
	- If you see CORS errors, make sure your backend allows requests from `localhost:5173`.

---

### Backend (Django)
1. Open a terminal and navigate to the backend directory:
	```
	cd lms-backend
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
	cd lms-frontend
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

Visit http://localhost:5173 in your browser. Log in with the superuser credentials you created, or register a new account for testing.

---

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