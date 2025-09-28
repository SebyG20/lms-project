# LMS Project

A Learning Management System (LMS) built with a Django backend and a React + Vite frontend. This project allows users to manage courses, enrollments, profiles, and more. This can be viewed by clicking [here](https://lms-frontendd.netlify.app/). If you wish to view everything in more detail, download lms-frontend and lms-backend and follow the instructions in [Backend Setup](#backend-setup) and [Frontend Setup](#frontend-setup)

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Database](#database)
- [Development](#development)
- [License](#license)

## Features
- User authentication and profile management
- Course creation, editing, and enrollment along with user managing, depending on the role
- Dashboard for students, teachers and admins
- Profile saving
- Support page

## Project Structure
```
lms-project/
├── lms-backend/      # Django backend + SQLite
├── lms-frontend/     # React + Vite frontend
├── others
```

## Deployment
The web application is already deployed and can be accessed at [lms-frontendd.netlify.app](https://lms-frontendd.netlify.app/).

## Database
- The backend uses SQLite (`lms.db`).
- Migrations are managed via Django.
- Deployed on Render.

## Development
- Backend: Django REST Framework, custom management commands, migrations.
- Frontend: React, TypeScript, Vite, modular components and pages.
- Deployed on Netfly.

