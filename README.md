# Cyber College LMS

A modern Learning Management System (LMS) for students, teachers, and admins. Built with Django (backend) and React + Vite (frontend).

---

## Clean ASCII Wireframes

### Navigation Bar
```
┌───────────────────────────────────────────────────────────────┐
│ Home │ Dashboard │ Register │ Support │ [User/Profile]        │
└───────────────────────────────────────────────────────────────┘
```

### Home Page
```
┌───────────────────────────────────────────────────────────────┐
│                            Home                               │
│ ┌───────────────────────────────────────────────────────────┐ │
│ │ Cyber College blends academic excellence...               │ │
│ │ [Apply Now]   [Sign Up]                                   │ │
│ └───────────────────────────────────────────────────────────┘ │
└───────────────────────────────────────────────────────────────┘
```

### Register Page
```
┌──────────────────────────── Register ─────────────────────────┐
│ Name:     [______________]                                    │
│ Email:    [______________]                                    │
│ Password: [______________]                                    │
│ [Register]   [Auto Fill]                                      │
│ Already have an account? [Log in]                             │
└───────────────────────────────────────────────────────────────┘
```

### Login Page
```
┌───────────────────────────── Login ───────────────────────────┐
│ Email:    [______________]                                    │
│ Password: [______________]                                    │
│ [Login]                                                       │
│ Don't have an account? [Register]                             │
└───────────────────────────────────────────────────────────────┘
```

### Student Dashboard
```
┌────────────── Student Dashboard ──────────────┐
│ Available Courses:                            │
│ ┌────────────┬────────────┬────────────┐      │
│ │Mathematics │ English    │ Biology    │ ...  │
│ │[View]      │ [View]     │ [View]     │      │
│ └────────────┴────────────┴────────────┘      │
└───────────────────────────────────────────────┘
```

### Admin/Teacher Dashboard
```
┌────────────── Admin Dashboard ────────────────┐
│ [Add Course] [Manage Users]                   │
│ All Courses:                                 │
│ ┌────────────┬────────────┬────────────┐      │
│ │Mathematics │ English    │ ...        │      │
│ │[View][Del] │ [View][Del]|            │      │
│ └────────────┴────────────┴────────────┘      │
└───────────────────────────────────────────────┘
```

### Manage Users Dashboard
```
┌────────────── Users Management ───────────────┐
│ ID | Name    | Email           | Role   | ... │
│----|---------|-----------------|--------|-----│
│ 1  | admin   | admin@email.com | admin  | ... │
│ 2  | Teacher | teacher@...     | teacher| ... │
│... | ...     | ...             | ...    | ... │
│ [Edit] [Delete] [Enrollments]                │
└───────────────────────────────────────────────┘
```

### Profile Page
```
┌───────────────────────────── Profile ──────────────────────────┐
│ [Avatar] Username                                             │
│ [Edit Profile] [Log Out]                                      │
│ All Courses:                                                  │
│ ┌────────────┬────────────┬────────────┐                      │
│ │Mathematics │ English    │ ...        │                      │
│ │[Enrolls]   │ [Enrolls]  │            │                      │
│ └────────────┴────────────┴────────────┘                      │
└───────────────────────────────────────────────────────────────┘
```

---

## Local Setup Guide

### 1. Clone the Repository
```sh
git clone https://github.com/SebyG20/lms-project.git
cd lms-project
```

### 2. Backend Setup (Django)
```sh
cd lms-backend
python -m venv .venv
.venv\Scripts\activate  # Windows
# or
source .venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
# API at http://localhost:8000/
```

### 3. Frontend Setup (React + Vite)
```sh
cd lms-frontend
npm install
# Change API URLs in frontend to http://localhost:8000/ (see src/utils/getApiBaseUrl.ts or fetch/axios calls)
# Description
# App at http://localhost:5173/
```


### 4. Running & Understanding Tests

#### Backend (Django)
- **Test location:** `lms-backend/lms/tests.py`
- **How to run:**
	```sh
	python manage.py test lms
	```
- **What is tested:**
	- **CourseApiTests**
		- `test_course_list`: Checks that the course list API returns status 200 and includes a test course. _Expected: 200 OK, course title in response._
		- `test_course_create`: Checks that a new course can be created via the API. _Expected: 201 CREATED, correct title in response._
		- `test_course_delete`: Checks that a course can be deleted by teacher. _Expected: 204 NO CONTENT._
	- **StudentApiTests**
		- `test_student_register`: Checks that a new student can register. _Expected: 201 CREATED, correct email in response._
		- `test_student_login`: Checks that a student can log in. _Expected: 200 OK, correct email in response._
- **Expected results:** All tests should pass with the expected status codes and data as described above.

#### Frontend (React)
- **Test location:**
	- Main tests: `lms-frontend/src/components/` (e.g., `Footer.test.tsx`, `NavbarMocked.test.tsx`)
	- Test setup: `lms-frontend/setupTests.ts`, `jest.config.cjs`, `babel.config.cjs`
- **How to run:**
	```sh
	npm test
	```
- **What is tested:**
	- **Footer.test.tsx**: Checks that the footer renders and contains the copyright.
		- _Expected: Footer is in the document, copyright text is present._
	- **NavbarMocked.test.tsx**: Checks that the Navbar renders with mocked router links.
		- _Expected: Navbar is in the document, navigation links are present._
	- (Other tests may exist for CourseList, etc. See `src/components/` for details.)
- **Expected results:** All tests should pass, confirming that UI components render and behave as expected.

**Note:**
- Frontend tests use React Testing Library and Jest. Some ESM/React Router v7+ issues are handled by mocking in test files.
- Backend tests use Django's APITestCase for API endpoint validation.

### 5. Default Accounts
- Use the superuser you created for admin access.
- Register as a student or teacher via the Register page.

### 6. Troubleshooting
- If you see CORS errors, ensure `django-cors-headers` is installed and configured in `settings.py`.
- If migrations fail, delete the `db.sqlite3` file and rerun migrations.
- For ESM/React Router issues in tests, see the `setupTests.ts` and `jest.config.cjs` for proper mocks.

---

## Features
- Student, Teacher, and Admin roles
- Course management (add, edit, delete, enroll)
- User registration, login, and profile management
- Responsive, modern UI
- Automated tests for backend and frontend

---

 
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