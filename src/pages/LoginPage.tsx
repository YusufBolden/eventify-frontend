import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { AxiosError } from 'axios'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    try {
      const response = await api.post('/users/login', { email, password })
      localStorage.setItem('userInfo', JSON.stringify(response.data))
      navigate('/')
      window.location.reload()
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>
      if (axiosError.response?.data?.message) {
        setError(axiosError.response.data.message)
      } else {
        setError('Login failed. Please try again.')
      }
    }
  }

  return (
    <div className="bg-[#E9D5FF] flex justify-center py-12">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">
          Login to Eventify
        </h2>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
