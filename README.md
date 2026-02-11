# Auth Dashboard – Full Stack Web Application

A scalable full-stack authentication dashboard built using React and Express.

## Overview

This project demonstrates secure authentication, protected routing, and CRUD operations with a scalable backend architecture.

##  Tech Stack

Frontend:
- React (Vite)
- React Router
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt Password Hashing
# Features

 User Registration  
 User Login  
 JWT Authentication  
 Protected Dashboard  
 Profile Fetch  
 Full CRUD Task Management  
 Search & Filter  
 Logout Flow  
 Secure Password Hashing  
 Error Handling  

## Project Structure

auth-dashboard/
│
├── frontend/
├── backend/
├── README.md
├── SCALING_NOTE.md

##Setup Instructions

## Backend

cd backend  
npm install  
node server.js  

Create .env file:

PORT=5000  
MONGO_URI=your_mongo_uri  
JWT_SECRET=your_secret  

### Frontend

cd frontend  
npm install  
npm run dev  

## API Endpoints

POST /api/auth/register  
POST /api/auth/login  
GET /api/auth/me  

GET /api/tasks  
POST /api/tasks  
PUT /api/tasks/:id  
DELETE /api/tasks/:id  

(All task routes require JWT token)

## Production Scaling Strategy

- Deploy backend on AWS / Render
- Use MongoDB Atlas
- Store secrets in environment variables
- Add rate limiting
- Implement refresh tokens
- Deploy frontend on Vercel

---

## 👨‍💻 Author

Deepak Singh  
GitHub: https://github.com/deepaksingh63
