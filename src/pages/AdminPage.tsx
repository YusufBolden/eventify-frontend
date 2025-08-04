import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import type { Event } from '../types/Event'
import type { UserInfo } from '../types/User'

const AdminPage = () => {
  const [activeTab] = useState<'users'>('users')
  const [users, setUsers] = useState<UserInfo[]>([])
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)
  const [userEvents, setUserEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)

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

  const fetchUserEvents = async (userId: string) => {
    setLoading(true)
    try {
      const res = await api.get(`/events?userId=${userId}`)
      setUserEvents(res.data)
    } catch (err) {
      console.error('Failed to fetch user events:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleSelectUser = (user: UserInfo) => {
    setSelectedUser(user)
    fetchUserEvents(user._id)
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="min-h-screen px-4 py-8 text-[#4338CA] bg-[#E9D5FF]">
      <div className="max-w-4xl mx-auto">
        {/* Left-aligned heading */}
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        {/* Tabs - matches SettingsPage style */}
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

        {/* User List */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {users.map(user => (
              <div
                key={user._id}
                onClick={() => handleSelectUser(user)}
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

          {/* Selected User Events */}
          {selectedUser && (
            <div className="bg-white p-4 rounded shadow overflow-auto">
              <h2 className="text-xl font-bold mb-2">
                Events for {selectedUser.name}
              </h2>
              {loading ? (
                <p>Loading events...</p>
              ) : userEvents.length === 0 ? (
                <p className="text-gray-600 text-sm">No events found.</p>
              ) : (
                <ul className="space-y-2">
                  {userEvents.map(event => (
                    <li key={event._id} className="border-b pb-2">
                      <div className="font-semibold">{event.title}</div>
                      <div className="text-sm text-gray-700">
                        {event.description || 'No description'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString()}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminPage
