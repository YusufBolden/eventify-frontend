import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const LearnMorePage = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const AdminLinks = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <button onClick={() => navigate('/dashboard?view=all')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">📅 Manage Users Events</button>
      <button onClick={() => navigate('/dashboard?view=my')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">📆 My Events</button>
      <button onClick={() => navigate('/admin')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">👥 Manage Users</button>
      <button onClick={() => navigate('/settings')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">⚙️ Admin Settings</button>
      <button onClick={() => navigate('/reports')} className="bg-white border border-indigo-600 rounded-lg p-6 text-indigo-700 hover:bg-indigo-50 font-semibold transition">📊 Reports</button>
      <button onClick={handleLogout} className="bg-red-600 text-white rounded-lg p-6 hover:bg-red-700 font-semibold transition">🚪 Logout</button>
    </div>
  )

  const UserLinks = () => (
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
      <div className="bg-[#E9D5FF] flex flex-col items-center flex-grow py-2 px-4">
        <div className="text-center w-full max-w-6xl mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
            About Eventify
          </h1>
          <p className="text-lg text-gray-700 mb-12 max-w-3xl mx-auto">
            Eventify empowers {user.isAdmin ? 'event administrators' : 'event organizers'} with the tools to plan, manage,
            and execute events effortlessly. Whether you’re coordinating a private celebration or managing
            multiple public events, Eventify provides a seamless, organized experience.
          </p>
          {user.isAdmin ? <AdminLinks /> : <UserLinks />}
        </div>
      </div>
    )
  }

  // Logged-out layout
  return (
    <div className="bg-[#E9D5FF] flex flex-col items-center flex-grow py-16 px-4">
      <div className="max-w-6xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-6">
          Learn More About Eventify
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
          Eventify is your all-in-one event management platform, designed to help you plan, organize, and
          track events effortlessly. Whether you’re an event organizer, a team member, or an attendee,
          Eventify gives you the tools you need to stay connected and informed.
        </p>

        <div className="grid gap-6 md:grid-cols-2 text-left max-w-4xl mx-auto mb-12">
          <div className="p-6 rounded-2xl bg-white shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">For Organizers</h2>
            <p className="text-gray-600">
              Create and manage events with ease. Invite guests, track RSVPs, and stay in control of every detail.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white shadow-md">
            <h2 className="text-2xl font-semibold text-indigo-600 mb-4">For Attendees</h2>
            <p className="text-gray-600">
              Access event information, schedules, and updates anytime. Easily RSVP and stay in sync with event changes.
            </p>
          </div>
        </div>

        {/* Same button layout as homepage */}
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
      </div>
    </div>
  )
}

export default LearnMorePage
