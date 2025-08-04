import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import type { UserInfo } from '../types/User'

const AdminPage = () => {
  const [activeTab] = useState<'users'>('users')
  const [users, setUsers] = useState<UserInfo[]>([])

  const navigate = useNavigate()
  const userInfo: UserInfo | null = JSON.parse(localStorage.getItem('userInfo') || 'null')

  useEffect(() => {
    if (!userInfo?.isAdmin) {
      navigate('/dashboard')
    }
  }, [userInfo, navigate])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      setUsers(res.data)
    } catch (err) {
      console.error('Failed to fetch users:', err)
    }
  }

  const handleSelectUser = (userId: string) => {
    navigate(`/admin/users/${userId}`)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen px-4 py-8 text-[#4338CA] bg-[#E9D5FF]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <div className="flex mb-6 border-b border-gray-300">
          <button
            className={`px-4 py-2 font-semibold ${
              activeTab === 'users'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Users
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {users.map(user => (
              <div
                key={user._id}
                onClick={() => handleSelectUser(user._id)}
                className="bg-white p-4 rounded shadow cursor-pointer hover:bg-indigo-50"
              >
                <div className="font-semibold">{user.name}</div>
                <div className="text-sm text-gray-700">{user.email}</div>
                <div className="text-xs text-gray-500">
                  {user.isAdmin ? 'Admin' : 'User'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage
