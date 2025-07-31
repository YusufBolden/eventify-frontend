import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import type { UserInfo } from '../types/User'

const HomePage = () => {
  const [user, setUser] = useState<UserInfo | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const stored = localStorage.getItem('userInfo')
    if (stored) {
      setUser(JSON.parse(stored))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
    window.location.reload()
  }

  const renderAdminGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        📅 Manage Users Events
      </button>
      <button
        onClick={() => navigate('/dashboard')}
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

  const renderUserGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <button
        onClick={() => navigate('/dashboard')}
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
        ⚙️ User Settings
      </button>
      <button
        onClick={() => navigate('/profile')}
        className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition"
      >
        🔐 Profile
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
            {user.isAdmin ? renderAdminGrid() : renderUserGrid()}
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
