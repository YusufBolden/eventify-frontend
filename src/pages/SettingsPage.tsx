import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { toast } from 'react-hot-toast'
import type { AxiosError } from 'axios'
import { useAuth } from '../context/useAuth'

const SettingsPage = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth() // pulls from global auth state

  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [password, setPassword] = useState('')
  const [profilePic, setProfilePic] = useState(user?.profilePic || '')
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'admin' | 'my'>(
    user?.isAdmin ? 'admin' : 'my'
  )

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (!user) {
    return null 
  }
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await api.put(
        '/users/profile',
        { name, email, password, profilePic },
        { headers: { Authorization: `Bearer ${user.token}` } }
      )

      // Syncs both localStorage and context
      localStorage.setItem('userInfo', JSON.stringify(data))
      setUser(data)

      setPassword('')
      toast.success('Profile updated successfully')
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>
      if (axiosError.response?.data?.message) {
        toast.error(axiosError.response.data.message)
      } else {
        toast.error('Failed to update profile')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const formData = new FormData()
      formData.append('image', e.target.files[0])

      try {
        setLoading(true)
        const { data } = await api.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${user.token}`,
          },
        })
        setProfilePic(data.imageUrl)
        toast.success('Profile picture uploaded successfully')
      } catch {
        toast.error('Image upload failed')
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <div className="px-4 py-8 text-[#4338CA] max-w-2xl mx-auto">
<h1 className="text-3xl font-bold mb-6">
  {user.isAdmin
    ? activeTab === 'admin'
      ? 'Admin Settings'
      : 'My Settings'
    : 'Settings'}
</h1>
      {/* Tabs for Admin */}
      {user.isAdmin && (
        <div className="flex mb-6 border-b border-gray-300">
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'admin'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Admin Settings
          </button>
          <button
            onClick={() => setActiveTab('my')}
            className={`px-4 py-2 font-semibold ${
              activeTab === 'my'
                ? 'border-b-2 border-indigo-600 text-indigo-600'
                : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            My Settings
          </button>
        </div>
      )}

      {/* Admin Settings Tab */}
      {(!user.isAdmin || activeTab === 'admin') && user.isAdmin && (
        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4">System Configuration</h2>
          <div className="bg-white shadow p-6 rounded-xl border border-[#6366F1] text-gray-600">
            <p>
              This section will contain system-wide admin settings such as theme defaults, 
              event approval policies, and other administrative controls.
            </p>
          </div>
        </section>
      )}

      {/* My Settings Tab */}
      {(!user.isAdmin || activeTab === 'my') && (
        <>
          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-4">My Profile</h2>
            <form
              onSubmit={handleUpdate}
              className="bg-white shadow p-6 rounded-xl border border-[#6366F1] space-y-6"
            >
              {/* Profile Picture */}
              <div>
                <label className="block font-semibold mb-2">
                  Profile Picture
                </label>
                <img
                  src={profilePic || '/avatar-placeholder.svg'}
                  alt="Profile Preview"
                  className="w-24 h-24 rounded-full object-cover mb-3 border border-gray-300"
                />
               <input
  type="file"
  accept="image/*"
  onChange={handleFileChange}
  className="block w-full text-sm text-gray-700 border border-gray-300 rounded p-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-800 hover:file:bg-gray-200 file:shadow-sm"
/>
              </div>

              {/* Name */}
              <div>
                <label className="block font-semibold mb-2">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block font-semibold mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border rounded p-2"
                />
              </div>

              {/* Save Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </section>

        </>
      )}
    </div>
  )
}

export default SettingsPage
