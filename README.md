Frontend Developer Intern Assignment – Full-Stack Web App

A full-stack scalable web application built as part of the Frontend Developer Intern Assignment, featuring authentication, a protected dashboard, CRUD operations, profile management, and JWT-based security.

This project demonstrates frontend engineering, API integration, backend development, and scalable architecture design.

🚀 Tech Stack
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

Multer (optional – for avatar uploads)

📁 Project Structure
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

🔐 Features Implemented
Authentication

Signup/Login using JWT

Password hashing with bcrypt

Protected routes

Dashboard

Fully authenticated dashboard

User profile display

Notes CRUD operations

Search + Filter

Logout functionality

Backend

REST APIs

Profile update

CRUD for notes

Validation + error handling

MongoDB Atlas database

Frontend

Responsive UI with TailwindCSS

Form validation

API service layer

Dashboard + CRUD UI

🎯 How to Run the Project Locally
1️⃣ Clone the project
git clone https://github.com/<your-username>/fe-intern-project.git
cd fe-intern-project

2️⃣ Backend Setup
cd backend
npm install


Create .env:

PORT=4000
MONGO_URI=<your-mongodb-atlas-connection-string>
JWT_SECRET=<your-secret>
JWT_EXPIRES_IN=7d


Start backend:

npm run dev


Backend runs on:

http://localhost:4000

3️⃣ Frontend Setup
cd ../frontend
npm install


Create .env:

VITE_API_URL=http://localhost:4000/api


Run frontend:

npm run dev


Frontend runs on:

http://localhost:5173