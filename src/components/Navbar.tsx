import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const Navbar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-indigo-600 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-white text-xl font-bold">
          Eventify
        </Link>
        <div className="space-x-4">
          <Link
            to="/"
            className={`py-2 px-4 font-semibold rounded ${
              isActive('/') ? 'bg-white text-indigo-600' : 'text-white hover:bg-indigo-500'
            }`}
          >
            Home
          </Link>

          {user && (
            <Link
              to={user.isAdmin ? '/admin' : '/dashboard'}
              className={`py-2 px-4 font-semibold rounded ${
                isActive('/dashboard') || isActive('/admin')
                  ? 'bg-white text-indigo-600'
                  : 'text-white hover:bg-indigo-500'
              }`}
            >
              {user.isAdmin ? 'Admin' : 'Dashboard'}
            </Link>
          )}

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
    </nav>
  )
}

export default Navbar
