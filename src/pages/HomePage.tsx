import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { useEffect, useState } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const eventImages = [
  'https://images.pexels.com/photos/3171837/pexels-photo-3171837.jpeg', // Birthday
  'https://images.pexels.com/photos/265947/pexels-photo-265947.jpeg', // Wedding
  'https://runway-media-production.global.ssl.fastly.net/us/originals/2023/05/2Carnival_Cruise_Q1_Cozumel_113017_Pip_Cowley_0L8A5463.jpg?width=2000&crop=16%3A9%2Coffset-x50%2Coffset-y50', // Party cruise
  'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg', // Business Conference
  'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg', // Concert
  'https://images.pexels.com/photos/2263436/pexels-photo-2263436.jpeg', // Parade
]

const HomePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % eventImages.length)
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + eventImages.length) % eventImages.length)

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000)
    return () => clearInterval(interval)
  }, [])

  const AdminGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <button onClick={() => navigate('/dashboard?view=all')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">📅 Manage Users Events</button>
      <button onClick={() => navigate('/dashboard?view=my')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">📆 My Events</button>
      <button onClick={() => navigate('/admin')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">👥 Manage Users</button>
      <button onClick={() => navigate('/settings')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">⚙️ Admin Settings</button>
      <button onClick={() => navigate('/reports')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">📊 Reports</button>
      <button onClick={handleLogout} className="bg-red-600 text-white rounded-lg p-6 hover:bg-red-700 font-semibold transition">🚪 Logout</button>
    </div>
  )

  const UserGrid = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <button onClick={() => navigate('/dashboard?view=my')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">📅 My Events</button>
      <button onClick={() => navigate('/guests')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">🙋 Guest List</button>
      <button onClick={() => navigate('/settings')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">⚙️ Settings</button>
      <button onClick={handleLogout} className="bg-red-600 text-white rounded-lg p-6 hover:bg-red-700 font-semibold transition">🚪 Logout</button>
    </div>
  )

  // Logged-in layout
  if (user) {
    return (
      <div className="bg-[#E9D5FF] flex flex-col items-center flex-grow py-16 px-4">
        <div className="text-center w-full max-w-6xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-gray-700 mb-12">
            Navigate through your {user.isAdmin ? 'admin tools' : 'dashboard'}.
          </p>
          {user.isAdmin ? <AdminGrid /> : <UserGrid />}
        </div>
      </div>
    )
  }

  // Logged-out hero
  return (
    <div className="bg-[#E9D5FF] flex flex-col justify-center items-center flex-grow py-16 px-4">
      <div className="flex flex-col lg:flex-row items-center max-w-6xl w-full gap-8 mb-12">
        {/* Carousel */}
        <div className="w-full lg:w-1/2">
          <div className="relative w-full h-80 overflow-hidden rounded-lg shadow-lg">
            <img src={eventImages[currentIndex]} alt={`Event ${currentIndex + 1}`} className="w-full h-full object-cover transition-all duration-500" />
            <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 text-indigo-600 p-2 rounded-full shadow hover:bg-white">
              <FaChevronLeft />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 text-indigo-600 p-2 rounded-full shadow hover:bg-white">
              <FaChevronRight />
            </button>
          </div>
          {/* Dots BELOW image */}
          <div className="flex justify-center mt-4 gap-2">
            {eventImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full shadow-md ${idx === currentIndex ? 'bg-indigo-600' : 'bg-white'}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="text-center lg:text-left lg:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 leading-tight mb-4">
            Plan Better. <br /> Celebrate Smarter.
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-lg mx-auto lg:mx-0">
            Eventify helps you manage events, track guests, and simplify planning for any occasion.
          </p>
          <Link to="/learn-more" className="inline-block mb-8 text-indigo-600 hover:underline font-semibold">
            Learn More →
          </Link>
          <div className="space-x-4">
            <Link to="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition">
              User Login
            </Link>
            <Link to="/admin/login" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition">
              Admin Login
            </Link>
            <Link to="/register" className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-3 px-6 rounded-md border border-indigo-600 transition">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
