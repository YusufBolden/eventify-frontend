import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const NAVBAR_HEIGHT = 64 // Tailwind ~ h-16

const LearnMorePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

 // Logged-in layout
  if (user) {
    return (
      <div
        className="bg-[#E9D5FF] flex flex-col justify-start items-center px-4 pt-8"
        style={{ minHeight: `calc(80vh - ${NAVBAR_HEIGHT}px)` }}
      >
        <div className="text-center w-full max-w-3xl flex flex-col items-center justify-start flex-grow pb-0">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-4">
            Welcome Back
          </h1>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl">
            You’re already part of the story. Keep building unforgettable moments, or head back to your dashboard to keep planning.
          </p>
          <div className="flex gap-4 justify-center mb-0">
            <Link
              to="/dashboard"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition"
            >
              Back to Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-md transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    )
  }
  // Logged-out layout
  return (
    <div
      className="bg-[#E9D5FF] flex flex-col justify-center items-center px-4"
      style={{ height: `calc(80vh - ${NAVBAR_HEIGHT}px)` }}
    >
      <div className="text-center w-full max-w-6xl">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-3">
          Why Eventify?
        </h1>
        <p className="text-lg text-indigo-700 font-semibold mb-3 max-w-3xl mx-auto">
          Eventify is your ultimate event management platform. Built to turn every gathering into an unforgettable experience.
        </p>
        <div className="text-2xl font-extrabold text-indigo-700 border-l-4 border-indigo-500 pl-4 mt-4 mb-8 max-w-2xl mx-auto">
          Your next big moment is waiting. Make it unforgettable. Plan now before someone else steals the spotlight.
        </div>

        <div className="grid gap-4 md:grid-cols-2 text-left max-w-4xl mx-auto mb-8">
          <div className="p-4 rounded-2xl bg-white shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">For Organizers</h2>
            <p className="text-gray-600">
              Create and manage events with ease. Invite guests, track RSVPs, and stay in control of every detail.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-2">For Attendees</h2>
            <p className="text-gray-600">
              Access event information, schedules, and updates anytime. Easily RSVP and stay in sync with event changes.
            </p>
          </div>
        </div>

        <div className="space-x-2">
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            User Login
          </Link>
          <Link
            to="/admin/login"
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition"
          >
            Admin Login
          </Link>
          <Link
            to="/register"
            className="bg-white hover:bg-gray-100 text-indigo-600 font-semibold py-2 px-4 rounded-md border border-indigo-600 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LearnMorePage
