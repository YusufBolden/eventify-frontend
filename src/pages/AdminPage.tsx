import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import type { Event } from '../types/Event'
import type { UserInfo } from '../types/User'
import type { Settings } from '../types/Settings'

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'users'>('settings')
  const [settings, setSettings] = useState<Settings[]>([])
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

  const fetchSettings = async () => {
    try {
      const res = await api.get('/settings')
      setSettings(res.data)
    } catch (err) {
      console.error('Failed to fetch settings:', err)
    }
  }

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

  const handleSettingChange = (key: string, value: string) => {
    setSettings(prev =>
      prev.map(setting =>
        setting.key === key ? { ...setting, value } : setting
      )
    )
  }

  const handleSettingSave = async (key: string, value: string) => {
    try {
      await api.post('/settings', { key, value })
    } catch (err) {
      console.error(`Failed to save setting '${key}':`, err)
    }
  }

  useEffect(() => {
    if (activeTab === 'settings') fetchSettings()
    if (activeTab === 'users') fetchUsers()
  }, [activeTab])

  return (
    <div className="min-h-screen px-4 py-8 text-[#4338CA] bg-[#E9D5FF]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>

        <div className="flex justify-center mb-8 gap-4">
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-4 rounded-md font-semibold ${
              activeTab === 'settings'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 border border-indigo-600'
            }`}
          >
            Settings
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-4 rounded-md font-semibold ${
              activeTab === 'users'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-indigo-600 border border-indigo-600'
            }`}
          >
            Users
          </button>
        </div>

        {activeTab === 'settings' && (
          <div className="space-y-6">
            {settings.map(setting => (
              <div key={setting._id} className="bg-white p-4 rounded shadow">
                <div className="mb-2 font-medium">{setting.key}</div>
                <input
                  type="text"
                  value={setting.value as string}
                  onChange={e =>
                    handleSettingChange(setting.key, e.target.value)
                  }
                  onBlur={() =>
                    handleSettingSave(setting.key, setting.value as string)
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'users' && (
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
        )}
      </div>
    </div>
  )
}

export default AdminPage
