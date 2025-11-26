🌐 Frontend Developer Intern Assignment – Full-Stack Web Application

A modern full-stack web application built as part of the Frontend Developer Intern Assignment, showcasing skills in frontend engineering, backend development, authentication, CRUD operations, profile management, and scalable app architecture.

This project demonstrates the ability to build production-ready apps with secure APIs, protected routes, and database-backed functionality.

🚀 Tech Stack
```bash
Frontend
    React (Vite)
    TailwindCSS
    Axios
    React Router
    Protected Routes

Backend
    Node.js + Express
    MongoDB Atlas
    JWT Authentication
    Bcrypt Password Hashing
```

## 📁 Project Structure

```bash
fe-intern-project/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   ├── vite.config.js
│   ├── index.html
│   └── package.json
│
└── README.md
```

🔐 Core Features

```bash
Authentication

    Secure Login / Signup using JWT
    
    Password hashing with bcrypt
    
    Protected routes on frontend
    
    Token storage with Axios interceptors

Dashboard

    Authenticated dashboard with personalized data
    
    CRUD operations for Notes
    
    Search + Filter functionality
    
    Pagination support
    
    Smooth UI with TailwindCSS

User Profile

    View user information
    
    Update profile details (name, email)
    
    Upload / update avatar image
    
    Image hosting using Express static folder

Backend

    REST API architecture
    
    MongoDB Atlas database
    
    Authentication middleware
    
    Validation and error handling
    
    Scalable folder structure

Frontend

    Fully responsive UI
    
    Clean component architecture
    
    Modern dashboard layout
    
    Centralized API service
    
    Loading skeletons + animations

```

🌐 Live Demo

🌍 Frontend (Vercel) 
[https://fe-intern-project.vercel.app/](https://fe-intern-project-bpjel7k7r-nishar-ahmads-projects.vercel.app/)

🛠 Backend (Render) 
[https://fe-intern-project.onrender.com/api](https://fe-intern-project.onrender.com/health)

🎯 HOW TO RUN LOCALLY

1️⃣ Clone the repository
--------------------------------
git clone https://github.com/Nishar-Ahmad1132/fe-intern-project.git

cd fe-intern-project


2️⃣ Backend Setup
--------------------------------
cd backend

npm install

# Create .env file (backend)
PORT=4000

MONGO_URI=<your-mongodb-atlas-uri>

JWT_SECRET=<your-secret-key>

JWT_EXPIRES_IN=7d

# Start backend
npm run dev

# Backend available at:
http://localhost:4000


3️⃣ Frontend Setup
--------------------------------
cd ../frontend

npm install

# Create .env file (frontend)
VITE_API_URL=http://localhost:4000/api

# Start frontend
npm run dev

# Frontend available at:
http://localhost:5173


Frontend runs on:

http://localhost:5173



📈 Scalability & Production Notes
```
Frontend can be deployed on Vercel, Netlify, or static hosting.
Backend is stateless → suitable for horizontal scaling (Render, Railway, AWS).
JWT authentication supports distributed environments.
MongoDB Atlas supports auto-scaling + global access.
Components and routes are fully modular for future expansion.
API layer is isolated for switching backend with minimal changes.
```
