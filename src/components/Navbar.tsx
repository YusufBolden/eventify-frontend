import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import BackButton from './BackButton'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          Eventify
        </Link>

        <div className="space-x-4">
          {/* Home link always shown */}
          <Link
            to="/"
            className={`py-2 px-4 font-semibold rounded ${
              isActive('/') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
            }`}
          >
            Home
          </Link>

          {/* About link */}
          <Link
            to="/learn-more"
            className={`py-2 px-4 font-semibold rounded ${
              isActive('/learn-more') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
            }`}
          >
            About
          </Link>

          {/* Logged-in users */}
          {user && !user.isAdmin && (
            <>
              <Link
                to="/dashboard"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/dashboard') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Events
              </Link>
              <Link
                to="/guests"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/guests') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Guests
              </Link>
              <Link
                to="/settings"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/settings') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Settings
              </Link>
            </>
          )}

          {/* Logged-in admins */}
          {user?.isAdmin && (
            <>
              <Link
                to="/dashboard"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/dashboard') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Users
              </Link>
              <Link
                to="/settings"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/settings') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Settings
              </Link>
              <Link
                to="/reports"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/reports') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Reports
              </Link>
            </>
          )}

          {/* Guest links */}
          {!user && (
            <>
              <Link
                to="/login"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/login') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                User Login
              </Link>
              <Link
                to="/admin/login"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/admin/login') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Admin Login
              </Link>
              <Link
                to="/register"
                className={`py-2 px-4 font-semibold rounded ${
                  isActive('/register') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
                }`}
              >
                Register
              </Link>
            </>
          )}

          {/* Logout for logged-in users */}
          {user && (
            <button
              onClick={handleLogout}
              className="py-2 px-4 font-semibold text-white bg-red-500 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <BackButton />
    </nav>
  )
}

export default Navbar
