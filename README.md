
# Quizo - Quiz Management System 📝

Quizo is a **Quiz Management System** where teachers can create, edit, and delete quizzes.  
The project uses **React (frontend)** and **Node.js + Express with Supabase (backend)**.

---

## 🚀 Features  
✅ **User Authentication** (Register/Login)  
✅ **Quiz Management** (Create, Edit, Delete)  
✅ **Secure PostgreSQL Database with Supabase**  
✅ **Responsive UI with Tailwind CSS & ShadCN**  

---

## 📌 Tech Stack  
**Frontend:** React, TypeScript, Vite, Tailwind CSS, ShadCN  
**Backend:** Node.js, Express, PostgreSQL (Supabase), Vercel/Render  

---

# 🛠️ Project Setup Instructions  

## 1️⃣ **Clone the Repository**  
```sh
git clone https://github.com/anishtanwar11/quizo.git

cd quizo
```
## 2️⃣ Backend Setup (Node.js + Express)
```sh
cd backend

npm install
```
## 3️⃣ Supabase database Setup

Login into Supabase and copy URL and create new database after that create tables 

## USERS TABLE

```sh
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

```

## QUIZZES TABLE

```sh
CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    teacher_id INT NOT NULL,
    FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);


```
## 4️⃣ Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```sh
Create a .env file inside the backend/ folder:

DATABASE_URL=postgresql://postgres:your_database_password@db.xxxxxx.supabase.co:5432/postgres
PORT=5000
```

Run Backend Locally
```sh
npm start

✅ Your backend will run at: http://localhost:5000
```
## 5️⃣ **APIs Demo**


## API Endpoints
Here are the available API endpoints:

🔑 Authentication API

🔹 Register User
```sh
POST > http://localhost:5000/api/register

Request Body:
{
  "username": "anish",
  "password": "password123"
}

Response:
{
  "message": "User registered successfully!",
  "user": {
    "id": 1,
    "username": "anish"
  }
}
```
🔹 Login User
```sh
POST > http://localhost:5000/api/login

Request Body:
{
  "username": "anish",
  "password": "password123"
}

Response:
{
  "message": "Login successful!",
  "userId": 1,
  "username": "anish"
} 
```


📚 Quiz Management API

🔹 Create Quiz
```sh
POST > http://localhost:5000/api/quiz

Request Body:
{
  "title": "React Basics",
  "description": "A quiz about React fundamentals",
  "teacherId": 1
}

Response:
{
  "message": "Quiz created successfully!",
  "quiz": {
    "id": 1,
    "title": "React Basics",
    "description": "A quiz about React fundamentals",
    "teacherId": 1
  }
}
```

🔹 Edit Quiz
```sh
PUT > http://localhost:5000/api/quiz/:id

Request Body:
{
  "title": "Updated React Quiz",
  "description": "Updated description"
}
Response:
{
  "message": "Quiz updated successfully!"
}
```

🔹 Delete Quiz
```sh
DELETE > http://localhost:5000/quiz/:id

Response:
{
  "message": "Quiz deleted successfully!"
}
```

## 🎨 **Frontend Setup (React + Vite)**

```bash
  cd frontend

  npm install

  npm run dev
```


    
