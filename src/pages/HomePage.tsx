import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="bg-[#E9D5FF] flex justify-center py-24">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-700 mb-8">
          Welcome to Eventify
        </h1>
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

export default HomePage
