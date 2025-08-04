# 🎓 Eventify – A Modern Collaborative Event Planner

Eventify is a modern, full-stack event planning app designed for individuals and teams who want to streamline the way they plan, organize, and collaborate on events. From weddings and birthdays to conferences and offsites, Eventify lets users create events, send guest invites, manage RSVPs, assign planning tasks, and coordinate logistics with co-hosts — all in one place.

Built using a mobile-first and accessibility-first approach, Eventify ensures that all users, regardless of device or ability, can plan and participate in events with ease.

## 🚢 Live Deployment
[View Frontend on Render](https://eventify-frontend-nvb8.onrender.com)


## 🛠️ Tech Stack

### 🚀 Core Stack
![MERN Stack](https://img.shields.io/badge/Stack-MERN-3e863d?style=flat-square&logo=mongodb&logoColor=white)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/ODM-Mongoose-880000?style=flat-square)
![Express](https://img.shields.io/badge/Backend-Express.js-000000?style=flat-square&logo=express&logoColor=white)
![Node.js](https://img.shields.io/badge/Runtime-Node.js-339933?style=flat-square&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Build-Vite-646CFF?style=flat-square&logo=vite&logoColor=white)

### 🎨 UI & Styling
![Tailwind CSS](https://img.shields.io/badge/UI-Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

### 🔐 Authentication & Security
![JWT](https://img.shields.io/badge/Auth-JWT-FFB400?style=flat-square&logo=jsonwebtokens&logoColor=black)
![bcrypt](https://img.shields.io/badge/Security-bcrypt-ef5c00?style=flat-square)
![CORS](https://img.shields.io/badge/Middleware-CORS-blue?style=flat-square)
![dotenv](https://img.shields.io/badge/Env-dotenv-green?style=flat-square)

### 🧰 Dev Tools & Utilities
![Axios](https://img.shields.io/badge/HTTP-Axios-5A29E4?style=flat-square&logo=axios&logoColor=white)
![Nodemon](https://img.shields.io/badge/Dev-Nodemon-76D04B?style=flat-square&logo=nodemon&logoColor=black)
![ESLint](https://img.shields.io/badge/Linter-ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Formatter-Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

### 🧪 Testing & Debugging
![Postman](https://img.shields.io/badge/API_Postman-FF6C37?style=flat-square&logo=postman&logoColor=white)

### 📦 Deployment
![Render](https://img.shields.io/badge/Deploy-Render-46E3B7?style=flat-square&logo=render&logoColor=black)
![MongoDB Atlas](https://img.shields.io/badge/DB_Host-MongoDB_Atlas-11B048?style=flat-square&logo=mongodb&logoColor=white)

### 🖼️ CDN/Media Management
![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=for-the-badge&logo=cloudinary&logoColor=white)

### ⏱️ Cron‑job - Scheduling / Automation
![Cron Job](https://img.shields.io/badge/Cron%20Job-4285F4?style=for-the-badge&logo=cronjob&logoColor=white)


### Backend file structure

```
backend/
├── src/
│   ├── config/
│   │   ├── cloudinary.js
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── eventController.js
│   │   ├── guestController.js
│   │   ├── settingsController.js
│   │   ├── taskController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── adminMiddleware.js
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   ├── ownershipMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── Event.js
│   │   ├── Guest.js
│   │   ├── Settings.js
│   │   ├── Task.js
│   │   ├── User.js
│   │   └── UserModal.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── guestRoutes.js
│   │   ├── settingsRoutes.js
│   │   ├── taskRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   └── server.js
├── .env.example
├── package.json
├── package-lock.json
└── README.md
```

### Frontend file structure
```
frontend/
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── .gitignore
├── public/
│   ├── avatar-placeholder.svg
│   └── logo.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── assets/
    ├── api/
    │   ├── axios.ts
    ├── types/
    │   ├── Auth.ts
    │   ├── Event.ts
    │   ├── Guest.ts
    │   ├── Settings.ts
    │   ├── Task.ts
    │   ├── User.ts
    ├── components/
    │   ├── AdminLoginButton.tsx
    │   ├── BackButton.tsx
    │   ├── Calendar.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── LoadingSpinner.tsx
    │   ├── Navbar.tsx
    │   ├── ProtectedRoute.tsx
    │   └── Toast.tsx
    ├── context/
    │   ├── AuthContext.tsx
    │   ├── AuthProvider.tsx
    │   ├── EventContext.tsx
    │   └── useAuth.ts
    ├── modals/
    │   ├── EventModal.tsx
    │   ├── GuestModal.tsx
    │   ├── SettingsModal.tsx
    │   └── TaskModal.ts
    ├── pages/
    │   ├── AdminLoginPage.tsx
    │   ├── AdminPage.tsx
    │   ├── AdminUserEventsPage.tsx
    │   ├── DashboardPage.tsx
    │   ├── EventPage.tsx
    │   ├── GuestPage.tsx
    │   ├── HomePage.tsx
    │   ├── LearnMorePage.tsx
    │   ├── LoginPage.tsx
    │   ├── RegisterPage.tsx
    │   ├── SettingsPage.tsx
    │   └── TaskPage.tsx
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── ProtectedRoute.tsx
    │   └── LoadingSpinner.tsx
    ├── types/
    │   ├── Auth.ts
    │   ├── Event.ts
    │   ├── Guest.ts
    │   ├── Settings.ts
    │   ├── Task.ts
    │   └── User.ts
    │   ├── utils/
            └── api.ts    
```

## 🔐 Features

- **User Authentication**
  - Register and login with hashed passwords
  - JWT-based secure sessions

- **Protected Routes**
  - Users can only access their own projects and tasks

- **Event Management**
  - Create, read, update, delete your own projects

- **Modular Codebase**
  - Organized by `controllers/`, `models/`, `routes/`, and `utils/`
  - Clean separation of concerns

---
## 📮 API Reference

### 👤 User Routes

| Method | Endpoint              | Description              | Auth |
|--------|-----------------------|--------------------------|:----:|
| `POST` | `/api/users/register` | Register new user        | 🔓   |
| `POST` | `/api/users/login`    | Login and return JWT     | 🔓   |

---

### 📁 User Routes

| Method  | Endpoint              | Description                 | Auth |
|---------|-----------------------|-----------------------------|:----:|
| `POST`  | `/api/users`          | Create a new user           | 🔒   |
| `GET`   | `/api/users`          | Get all users               | 🔒   |
| `GET`   | `/api/users/:id`      | Get a single user by ID     | 🔒   |
| `PUT`   | `/api/users/:id`      | Update a user               | 🔒   |
| `DELETE`| `/api/users/:id`      | Delete a user               | 🔒   |

---

### ✅ Event Routes

| Method  | Endpoint                                | Description                  | Auth |
|---------|-----------------------------------------|------------------------------|:----:|
| `POST`  | `/api/userevents/:id/`                  | Create a new event.          | 🔒   |
| `GET`   | `/api/dashboard?view=my`                | Get events for a user.       | 🔒   |
| `PUT`   | `/api/events/:id`                       | Update a event by ID         | 🔒   |
| `DELETE`| `/api/events/:id`                       | Delete a event by ID         | 🔒   |

---

### 🔐 Legend

- 🔓 = Public (no token required)
- 🔒 = Protected (JWT token required)

---

## 📫 Testing with Postman

1. Import this API manually in Postman or create a new collection.
2. Register a new user:  
   `POST /api/users/register` with JSON body:
   ```json
   {
     "username": "yusuf",
     "email": "yusuf@example.com",
     "password": "123456"
   }
   ```
3. Login:  
   `POST /api/users/login` → Save the returned token
4. Set `Authorization: Bearer <your_token>` for protected routes
5. Test project and task endpoints as needed

---

## 🧪 How to Test All Routes

### 🔐 Step 1: Register & Login

1. Register
    ```http
    POST /api/users/register
    Content-Type: application/json
    ```
    ```json
    {
      "username": "testuser",
      "email": "test@example.com",
      "password": "123456"
    }
    ```

2. Login
    ```http
    POST /api/users/login
    ```
    → Save the returned token.

---

### 📁 Step 2: Test User Routes

Add the following header to all requests:
```
Authorization: Bearer <your_token>
```

- Create User:
  ```http
  POST /api/users/register
  ```
  ```json
  {
    "name": "new user",
    "email": "Test new user",
    "password": "userpassword"
  }
  ```

- Get All Users: (admin only)
  ```http
  GET /api/user
  ```

- Update User:
  ```http
  PUT /api/user/:id
  ```

- Delete User:
  ```http
  DELETE /api/userjects/:id
  ```

---

### ✅ Step 3: Test Event Routes

- Create Event:
  ```http
  POST /api/events/:id/
  ```
  ```json
  {
    "title": "First event",
    "date": "Write docs",
    "description": "Wedding"
  }
  ```

- Get Events:
  ```http
  GET /api/events/id/
  ```

- Update Events:
  ```http
  PUT /api/events/:id
  ```

- Delete Event:
  ```http
  DELETE /api/event/:id
  ```

---


## 🧑🏿‍💻 Author

Created by [Yusuf Bolden](github.com/YusufBolden). Feedback and collaboration welcome!

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).