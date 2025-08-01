import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const HomePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const AdminGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <button
        onClick={() => navigate('/dashboard?view=all')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        📅 Manage Users Events
      </button>
      <button
        onClick={() => navigate('/dashboard?view=my')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        📆 My Events
      </button>
      <button
        onClick={() => navigate('/admin')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        👥 Manage Users
      </button>
      <button
        onClick={() => navigate('/settings')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        ⚙️ Admin Settings
      </button>
      <button
        onClick={() => navigate('/reports')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        📊 Reports
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white rounded-lg p-6 hover:bg-red-700 font-semibold transition"
      >
        🚪 Logout
      </button>
    </div>
  )

  const UserGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <button
        onClick={() => navigate('/dashboard?view=my')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        📅 My Events
      </button>
      <button
        onClick={() => navigate('/guests')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        🙋 Guest List
      </button>
      <button
        onClick={() => navigate('/settings')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        ⚙️ Settings
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white rounded-lg p-6 hover:bg-red-700 font-semibold transition"
      >
        🚪 Logout
      </button>
    </div>
  )

  return (
    <div className="bg-[#E9D5FF] flex flex-col justify-center items-center flex-grow py-16 px-4">
      <div className="text-center w-full max-w-5xl">
        {user ? (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-8">
              Welcome back, {user.name}!
            </h1>
            <p className="text-lg text-gray-700 mb-12">
              Navigate through your {user.isAdmin ? 'admin tools' : 'dashboard'}.
            </p>
            {user.isAdmin ? <AdminGrid /> : <UserGrid />}
          </>
        ) : (
          <>
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-8">
              Plan Better. Celebrate Smarter.
            </h1>
            <p className="text-lg text-gray-700 mb-12 max-w-xl mx-auto">
              Eventify helps you manage events, track guests, and simplify planning for any occasion.
            </p>
            <div className="space-x-4">
              <Link
                to="/login"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition"
              >
                User Login
              </Link>
              <Link
                to="/admin/login"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition"
              >
                Admin Login
              </Link>
              <Link
                to="/register"
                className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-md border border-indigo-600 transition"
              >
                Register
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default HomePage
