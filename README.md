# 🎓 Eventify – A Modern Collaborative Event Planner

Eventify is a modern, full-stack event planning app designed for individuals and teams who want to streamline the way they plan, organize, and collaborate on events. From weddings and birthdays to conferences and offsites, Eventify lets users create events, send guest invites, manage RSVPs, assign planning tasks, and coordinate logistics with co-hosts — all in one place.

Built using a mobile-first and accessibility-first approach, Eventify ensures that all users, regardless of device or ability, can plan and participate in events with ease.

## 🚢 Live Deployment
[View Backend on Render](https://eventify-g0fv.onrender.com)


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
│   │   └── ownershipMiddleware.js
│   ├── models/
│   │   ├── Event.js
│   │   ├── Guest.js
│   │   ├── Settings.js
│   │   ├── Task.js
│   │   └── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── eventRoutes.js
│   │   ├── guestRoutes.js
│   │   ├── settingsRoutes.js
│   │   ├── taskRoutes.js
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
├── public/
│   └── logo.svg
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── assets/
    ├── types/
    │   ├── index.ts
    ├── constants/
    │   └── index.ts
    ├── context/
    │   └── AuthContext.tsx
    ├── hooks/
    │   └── useAuth.ts
    ├── lib/
    │   └── axios.ts
    ├── pages/
    │   ├── Home.tsx
    │   ├── Login.tsx
    │   ├── Register.tsx
    │   ├── Dashboard.tsx
    │   ├── NotFound.tsx
    ├── components/
    │   ├── Header.tsx
    │   ├── Footer.tsx
    │   ├── ProtectedRoute.tsx
    │   └── LoadingSpinner.tsx
    ├── features/
    │   ├── users/
    │   │   ├── Profile.tsx
    │   ├── events/
    │   │   ├── EventList.tsx
    │   │   └── EventForm.tsx
    │   ├── guests/
    │   │   ├── GuestList.tsx
    │   │   └── GuestForm.tsx
    │   ├── tasks/
    │   │   ├── TaskList.tsx
    │   │   └── TaskForm.tsx
    │   └── settings/
    │       ├── SettingsForm.tsx
    │       └── SettingItem.tsx
    ├── routes/
    │   └── AppRoutes.tsx
    └── styles/
        └── index.css
```

## 🧑🏿‍💻 Author

Created by [Yusuf Bolden](github.com/YusufBolden). Feedback and collaboration welcome!

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).