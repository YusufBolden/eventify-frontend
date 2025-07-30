import { useNavigate } from 'react-router-dom'

const AdminLoginButton = () => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate('/admin/login')}
      className="text-sm text-white bg-emerald-600 hover:bg-emerald-700 py-2 px-4 rounded-md font-semibold transition"
    >
      Admin Login
    </button>
  )
}

export default AdminLoginButton
