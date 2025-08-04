import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api/axios'
import type { Event } from '../types/Event'
import type { UserInfo } from '../types/User'

const AdminUserEventsPage = () => {
  const { id: userId } = useParams<{ id: string }>()

  const [user, setUser] = useState<UserInfo | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get(`/users/${userId}`)
        setUser(res.data.user || res.data)
      } catch (err) {
        console.error('Failed to fetch user:', err)
      }
    }

    const fetchEvents = async () => {
      if (!userId) return
      setLoading(true)
      try {
        // gets user's events
        const res = await api.get(`/users/${userId}/events`)
        setEvents(res.data)
      } catch (err) {
        console.error('Failed to fetch events:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
    fetchEvents()
  }, [userId])

  return (
    <div className="min-h-screen px-4 py-8 text-[#4338CA] bg-[#E9D5FF]">
      <div className="max-w-4xl mx-auto">
        {user && (
          <h1 className="text-3xl font-bold mb-6">
            Events for {user.name}
          </h1>
        )}

        {loading ? (
          <p>Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-600">No events found.</p>
        ) : (
          <ul className="space-y-4">
            {events.map(event => (
              <li key={event._id} className="bg-white p-4 rounded shadow">
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
    </div>
  )
}

export default AdminUserEventsPage
