import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-[#4338CA] text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-wide text-[#E9D5FF]">
          Eventify
        </Link>
        <nav className="space-x-4">
          <Link to="/login" className="hover:text-[#4DE880] transition-colors">Login</Link>
          <Link to="/register" className="hover:text-[#4DE880] transition-colors">Register</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
