# 🎓 Student Task Management System

A full-stack web application built with **React**, **Node.js**, **Express**, and **MongoDB** to allow administrators to assign tasks to students, and students to view and update their tasks.

---

## 📁 Project Structure

```
/backend     ← Express + MongoDB (API server)
/client      ← React + Bootstrap (Frontend UI)
```

---

## 🚀 Live Features

- 🔐 JWT-based role-based authentication (Admin / Student)
- ✅ Admin can assign tasks to students
- 📋 Students can view and mark tasks as completed
- 🔄 Instant task list updates
- 📱 Responsive UI using Bootstrap 5

---

## 📥 How to Download & Run Locally

> **NOTE:** If you're accessing this via email, JavaScript files may be blocked by Gmail.  
> It's recommended to download the full source code ZIP from GitHub:

### 🔗 GitHub Repository
```
[(https://github.com/jimmy0194/CIS051-2-Web-Technologies-and-Platforms/tree/main)]
```

---

### 📦 Clone or Download the Repository

```bash
git clone https://github.com/your-username/student-task-management.git
cd student-task-management
```

Or download the ZIP and extract manually.

---

## 🔧 Backend Setup (`/backend`)

### 📁 Step 1: Navigate to backend folder
```bash
cd backend
```

### 📦 Step 2: Install dependencies
```bash
npm install
```

### ⚙️ Step 3: Create `.env` file
Create a `.env` file with the following:

```
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_jwt_secret
PORT=5000
```

> ✅ Make sure MongoDB is running locally or use MongoDB Atlas

### ▶️ Step 4: Start backend server
```bash
npm start
```

The backend will run on `http://localhost:5000`

---

## 🌐 Frontend Setup (`/client`)

### 📁 Step 1: Navigate to client folder
```bash
cd ../client
```

### 📦 Step 2: Install frontend dependencies
```bash
npm install
```

### ⚙️ Step 3: Create `.env` file in `/client`
```
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

### ▶️ Step 4: Start React frontend
```bash
npm start
```

The frontend will run on `http://localhost:3000`

---

## 🧪 Sample Admin & Student Users

You can create admin/student users via the registration route or insert them directly in MongoDB.

> OR use Postman to call:
```http
POST /api/auth/register
```

Payload:
```json
{
  "name": "Admin User",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
{
  "name": "Student User",
  "email": "student@example.com",
  "password": "student123",
  "role": "student"
}

```

And similarly for students.

---

## 📸 Screenshots

Screenshots of the Login Page, Admin Panel, and Student Dashboard are available in the `/screenshots` folder or GitHub README preview.

---

## 📃 License

This project is part of the University of Bedfordshire coursework for CIS051-2.  
Use for academic and learning purposes only.

---
