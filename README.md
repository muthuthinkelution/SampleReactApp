# 📝 MERN Stack Todo Application

A full-stack todo application built with MongoDB, Express.js, React, and Node.js (MERN stack) featuring user authentication, CRUD operations, and a modern UI.

---

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based authentication with bcrypt password hashing
- ✅ **CRUD Operations** - Create, Read, Update, and Delete todos
- ✏️ **Edit Todos** - Inline editing with real-time updates
- ☑️ **Toggle Completion** - Mark todos as complete/incomplete
- 👤 **User-Specific Data** - Each user can only see and manage their own todos
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 📊 **Statistics Dashboard** - Track total, active, and completed todos
- 🔒 **Protected Routes** - Secure pages accessible only to authenticated users
- 💾 **Persistent Storage** - Data stored in MongoDB database
- 🚀 **Fast Development** - Built with Vite for lightning-fast development

---

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Context API** - Global state management

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** - Either:
  - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Cloud - Recommended)
  - [Local MongoDB](https://www.mongodb.com/try/download/community) (Local installation)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### **1. Clone the Repository**

```bash
git clone https://github.com/yourusername/SampleReactapp.git
cd SampleReactapp
```

### **2. Backend Setup**

```bash
# Navigate to server directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

**Configure Environment Variables** (`.env` file):

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-todo-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

> **Note**: If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string:
> ```
> MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-todo-app?retryWrites=true&w=majority
> ```

**Start the Backend Server:**

```bash
npm run dev
```

The server will start on `http://localhost:5000`

### **3. Frontend Setup**

Open a **new terminal** and run:

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will open at `http://localhost:5173`

---

## 📁 Project Structure

```
mern-todo-app/
├── frontend/                 # Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   └── Register.tsx
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   └── ProtectedRoute.tsx
│   │   │   ├── TodoForm.tsx
│   │   │   ├── TodoItem.tsx
│   │   │   └── TodoList.tsx
│   │   ├── context/        # Global state management
│   │   │   ├── AuthContext.tsx
│   │   │   └── TodoContext.tsx
│   │   ├── pages/          # Page components
│   │   │   └── Dashboard.tsx
│   │   ├── services/       # API services
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── todoService.ts
│   │   ├── types/          # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx         # Main app component
│   │   ├── main.tsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── package.json
│   └── vite.config.ts
│
└── backend/                 # Backend (Node.js + Express + TypeScript)
    ├── src/
    │   ├── config/         # Configuration files
    │   │   └── database.ts
    │   ├── controllers/    # Route controllers
    │   │   ├── authController.ts
    │   │   └── todoController.ts
    │   ├── middleware/     # Custom middleware
    │   │   ├── auth.ts
    │   │   └── errorHandler.ts
    │   ├── models/         # MongoDB models
    │   │   ├── User.ts
    │   │   └── Todo.ts
    │   ├── routes/         # API routes
    │   │   ├── authRoutes.ts
    │   │   └── todoRoutes.ts
    │   ├── types/          # TypeScript types
    │   │   └── index.ts
    │   └── server.ts       # Main server file
    ├── package.json
    └── tsconfig.json
```

---

## 🔌 API Endpoints

### **Authentication Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes |

### **Todo Routes**

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/todos` | Get all user's todos | Yes |
| GET | `/api/todos/:id` | Get single todo | Yes |
| POST | `/api/todos` | Create new todo | Yes |
| PUT | `/api/todos/:id` | Update todo | Yes |
| DELETE | `/api/todos/:id` | Delete todo | Yes |
| PATCH | `/api/todos/:id/toggle` | Toggle todo completion | Yes |

---

## 📝 API Request Examples

### **Register User**

```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "admin",
  "email": "admin@gmail.com",
  "password": "admin@1234"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "65abc123...",
      "name": "admin",
      "email": "admin@gmail.com"
    }
  }
}
```

### **Login**

```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "admin@gmail.com",
  "password": "admin@1234"
}
```

### **Create Todo**

```bash
POST http://localhost:5000/api/todos
Authorization: Bearer YOUR_JWT_TOKEN
Content-Type: application/json

{
  "title": "Complete project documentation",
  "description": "Write comprehensive README file"
}
```

### **Get All Todos**

```bash
GET http://localhost:5000/api/todos
Authorization: Bearer YOUR_JWT_TOKEN
```

### **Toggle Todo Completion**

```bash
PATCH http://localhost:5000/api/todos/65abc123.../toggle
Authorization: Bearer YOUR_JWT_TOKEN
```

---

## 🎨 Features Walkthrough

### **1. User Registration & Login**
- Secure password hashing with bcrypt
- JWT token generation
- Form validation
- Error handling

### **2. Dashboard**
- View all todos
- Statistics (Total, Active, Completed)
- Separate sections for active and completed todos

### **3. Todo Management**
- **Create**: Add new todos with title and optional description
- **Read**: View all your todos in organized lists
- **Update**: Edit todo title and description inline
- **Delete**: Remove todos with confirmation
- **Toggle**: Mark todos as complete/incomplete with checkbox

### **4. Security**
- JWT authentication
- Protected API routes
- User-specific data isolation
- Password hashing
- Auto-logout on token expiry

---

## 🔒 Security Features

- **Password Hashing**: Passwords are hashed using bcrypt before storing
- **JWT Authentication**: Secure token-based authentication
- **Protected Routes**: Frontend and backend route protection
- **User Isolation**: Users can only access their own data
- **Environment Variables**: Sensitive data stored in .env file
- **CORS Configuration**: Controlled cross-origin access
- **Input Validation**: Server-side validation for all inputs

---

## 🧪 Testing the Application

### **Manual Testing Steps:**

1. **Register a new user**
   - Navigate to registration page
   - Fill in name, email, and password
   - Verify account creation

2. **Login**
   - Use registered credentials
   - Verify redirect to dashboard

3. **Create todos**
   - Add multiple todos with different titles
   - Verify they appear in the list

4. **Edit todos**
   - Click edit icon on any todo
   - Modify title/description
   - Save changes

5. **Toggle completion**
   - Click checkbox to mark complete
   - Verify todo moves to completed section
   - Click again to unmark

6. **Delete todos**
   - Click delete icon
   - Confirm deletion
   - Verify todo is removed

7. **Logout and Login**
   - Logout from current session
   - Login again
   - Verify todos are persisted

---

## 🐛 Troubleshooting

### **Backend Issues**

**Problem**: MongoDB connection error
```
Solution: 
- Check if MongoDB is running (local installation)
- Verify MONGODB_URI in .env file
- Check network connectivity (MongoDB Atlas)
```

**Problem**: Port 5000 already in use
```
Solution: 
- Change PORT in .env file to different port (e.g., 5001)
- Or kill process using port 5000
```

### **Frontend Issues**

**Problem**: Cannot connect to backend
```
Solution:
- Verify backend is running on http://localhost:5000
- Check API_URL in client/src/services/api.ts
- Ensure CORS is enabled on backend
```

**Problem**: Tailwind CSS not working
```
Solution:
- Delete node_modules and package-lock.json
- Run: npm install
- Restart dev server
```
---

Made with ❤️ using MERN Stack# SampleReactApp
React Project for learning purpose
