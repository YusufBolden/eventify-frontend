import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import EventPage from "./pages/EventPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminPage from "./pages/AdminPage";
import AdminUserEventsPage from "./pages/AdminUserEventsPage";
import SettingsPage from "./pages/SettingsPage";
import LearnMorePage from './pages/LearnMorePage'
import Toast from "./components/Toast";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Toast />
      <Navbar />
      <main className="flex-grow bg-[#E9D5FF]">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/learn-more" element={<LearnMorePage />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users/:id" element={<AdminUserEventsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
