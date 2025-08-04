import { useState, useEffect } from 'react'
import api from '../api/axios'
import { toast } from 'react-hot-toast'
import type { UserInfo, UserUpdatePayload } from '../types/User'

interface Props {
  isOpen: boolean
  onClose: () => void
  existingUser: UserInfo
  onUserUpdated: (updated: UserInfo) => void
  onUserDeleted: (id: string) => void
}

const UserModal = ({ isOpen, onClose, existingUser, onUserUpdated, onUserDeleted }: Props) => {
  const [form, setForm] = useState<UserUpdatePayload>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (existingUser) {
      setForm({
        name: existingUser.name,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
      })
    }
  }, [existingUser])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await api.put<UserInfo>(`/users/${existingUser._id}`, form)
      toast.success('User updated successfully')
      onUserUpdated(data)
      onClose()
    } catch {
      toast.error('Failed to update user')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await api.delete(`/users/${existingUser._id}`)
      toast.success('User deleted successfully')
      onUserDeleted(existingUser._id)
      onClose()
    } catch {
      toast.error('Failed to delete user')
    }
  }

  return (
    <div className="fixed inset-0 bg-[#E9D5FF] bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-indigo-600 mb-4 text-center">Edit User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={form.name || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email || ''}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="New Password (optional)"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAdmin"
              checked={!!form.isAdmin}
              onChange={handleChange}
            />
            Admin
          </label>

          <div className="flex justify-between gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-md font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-semibold"
            >
              Save
            </button>
          </div>
        </form>

        <button
          onClick={handleDelete}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md font-semibold"
        >
          Delete User
        </button>
      </div>
    </div>
  )
}

export default UserModal
