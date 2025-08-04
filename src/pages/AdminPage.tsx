import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api/axios'
import type { UserInfo } from '../types/User'
import { FaPen, FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import UserModal from '../modals/UserModal'

const AdminPage = () => {
  const [users, setUsers] = useState<UserInfo[]>([])
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null)
  const [showUserModal, setShowUserModal] = useState(false)

  const navigate = useNavigate()
  const userInfo: UserInfo | null = JSON.parse(localStorage.getItem('userInfo') || 'null')

  useEffect(() => {
    if (!userInfo?.isAdmin) navigate('/dashboard')
  }, [userInfo, navigate])

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users')
      setUsers(res.data)
    } catch {
      toast.error('Failed to fetch users')
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleEdit = (user: UserInfo) => {
    setSelectedUser(user)
    setShowUserModal(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return
    try {
      await api.delete(`/users/${id}`)
      toast.success('User deleted successfully')
      setUsers(prev => prev.filter(u => u._id !== id))
    } catch {
      toast.error('Failed to delete user')
    }
  }

  const handleUserUpdated = (updated: UserInfo) => {
    setUsers(prev => prev.map(u => (u._id === updated._id ? updated : u)))
  }

  const handleUserDeleted = (deletedId: string) => {
    setUsers(prev => prev.filter(u => u._id !== deletedId))
  }

  return (
    <div className="min-h-screen px-4 py-8 text-[#4338CA] bg-[#E9D5FF]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Manage Users</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {users.map(user => (
            <div key={user._id} className="bg-white p-4 rounded shadow">
              <div className="font-semibold">{user.name}</div>
              <div className="text-sm text-gray-700">{user.email}</div>
              <div className="text-xs text-gray-500">{user.isAdmin ? 'Admin' : 'User'}</div>
              <div className="flex gap-3 mt-3">
                <button onClick={() => handleEdit(user)} className="text-indigo-500 hover:text-indigo-700" title="Edit">
                  <FaPen />
                </button>
                <button onClick={() => handleDelete(user._id)} className="text-red-500 hover:text-red-700" title="Delete">
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUserModal && selectedUser && (
        <UserModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
          existingUser={selectedUser}
          onUserUpdated={handleUserUpdated}
          onUserDeleted={handleUserDeleted}
        />
      )}
    </div>
  )
}

export default AdminPage
