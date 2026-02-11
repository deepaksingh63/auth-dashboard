# 📬 API Documentation

## Base URL
http://localhost:5000/api

---

## 1️⃣ Register User

POST /auth/register

### Request Body
{
  "name": "Deepak",
  "email": "deepak@test.com",
  "password": "123456"
}

### Response
201 Created
{
  "message": "User registered successfully",
  "userId": "USER_ID"
}

---

## 2️⃣ Login User

POST /auth/login

### Request Body
{
  "email": "deepak@test.com",
  "password": "123456"
}

### Response
200 OK
{
  "token": "JWT_TOKEN"
}

---

## 🔐 Authorization

All protected routes require:

Authorization Header:
Bearer <JWT_TOKEN>

---

## 3️⃣ Get Profile

GET /auth/me

### Headers
Authorization: Bearer TOKEN

### Response
200 OK
{
  "_id": "USER_ID",
  "name": "Deepak",
  "email": "deepak@test.com"
}

---

## 4️⃣ Get All Tasks

GET /tasks

Authorization required.

### Response
200 OK
[
  {
    "_id": "TASK_ID",
    "title": "Learn JWT",
    "userId": "USER_ID"
  }
]

---

## 5️⃣ Create Task

POST /tasks

Authorization required.

### Request Body
{
  "title": "New Task"
}

### Response
200 OK
{
  "_id": "TASK_ID",
  "title": "New Task",
  "userId": "USER_ID"
}

---

## 6️⃣ Update Task

PUT /tasks/:id

Authorization required.

### Request Body
{
  "title": "Updated Task"
}

### Response
200 OK
{
  "_id": "TASK_ID",
  "title": "Updated Task",
  "userId": "USER_ID"
}

---

## 7️⃣ Delete Task

DELETE /tasks/:id

Authorization required.

### Response
200 OK
{
  "message": "Task deleted successfully"
}
