import { useEffect, useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import type { Event } from '../types/Event'
import { FaPen, FaTrash, FaArrowLeft } from 'react-icons/fa'
import { toast } from 'react-hot-toast'
import EventModal from '../modals/EventModal'
import { useAuth } from '../context/useAuth'
import { AxiosError } from 'axios'

const EventPage = () => {
  const { id } = useParams<{ id: string }>()
  console.log("EventPage Debug → ID from URL params:", id)

  const navigate = useNavigate()
  const { user } = useAuth()
  const [event, setEvent] = useState<Event | null>(null)
  const [error, setError] = useState('')
  const [showTopBackButton, setShowTopBackButton] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.body.classList.add('overflow-hidden')
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  useEffect(() => {
    const fetchEvent = async () => {
      if (!user?.token) {
        setError('You must be logged in to view this event.')
        return
      }

      try {
        console.log("EventPage Debug → Fetching event with token:", user.token)
        const res = await api.get<Event>(`/events/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        })
        setEvent(res.data)
        setError('')
      } catch (err: unknown) {
        const axiosError = err as AxiosError
        console.error("EventPage Debug → Fetch event failed:", axiosError)

        if (axiosError.response?.status === 401) {
          setError('You must be logged in to view this event.')
        } else if (axiosError.response?.status === 404) {
          setError('Event not found.')
        } else {
          setError('Failed to load event.')
        }
      }
    }

    fetchEvent()
  }, [id, user])

  useEffect(() => {
    const checkScrollability = () => {
      if (contentRef.current) {
        const el = contentRef.current
        setShowTopBackButton(el.scrollHeight > el.clientHeight + 60)
      }
    }
    setTimeout(checkScrollability, 100)
  }, [event])

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this event?')
    if (!confirmDelete) return

    try {
      await api.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      toast.success('Event deleted successfully')
      navigate('/dashboard')
    } catch (err: unknown) {
      const axiosError = err as AxiosError
      console.error("EventPage Debug → Delete event failed:", axiosError)
      toast.error('Failed to delete event')
    }
  }

  const handleEventUpdated = (updated: Event) => {
    setEvent(updated)
  }

  const closeModal = () => {
    setShowModal(false)
  }

  return (
    <div className="min-h-screen overflow-hidden bg-[#E9D5FF] px-4 py-12 text-center text-[#4338CA]">
      <div className="max-w-2xl mx-auto">
        {error ? (
          <>
            <h1 className="text-4xl font-bold mb-6">{error}</h1>
            {error === 'You must be logged in to view this event.' && (
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded transition"
                >
                  Register
                </button>
              </div>
            )}
          </>
        ) : event ? (
          <div
            className="bg-white shadow-lg rounded-xl p-6 text-left relative max-h-[80vh] overflow-y-auto"
            ref={contentRef}
          >
            <div className="absolute top-4 right-4 flex gap-2">
              {showTopBackButton && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-semibold"
                  title="Back"
                >
                  <FaArrowLeft />
                  <span>Back</span>
                </button>
              )}
              <button
                onClick={() => setShowModal(true)}
                className="text-indigo-600 hover:text-indigo-800"
                title="Edit"
              >
                <FaPen />
              </button>
              <button
                onClick={handleDelete}
                className="text-red-500 hover:text-red-700"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
            <p className="text-lg text-gray-700 whitespace-pre-line">{event.description}</p>
            <p className="text-sm text-gray-500 mt-4">
              {new Date(event.date).toLocaleDateString()}
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              ← Back to Dashboard
            </button>
          </div>
        ) : (
          <p className="text-lg text-gray-600">Loading event...</p>
        )}
      </div>

      {event && (
        <EventModal
          isOpen={showModal}
          onClose={closeModal}
          onEventCreated={() => {}}
          onEventUpdated={handleEventUpdated}
          editMode={true}
          existingEvent={event}
        />
      )}
    </div>
  )
}

export default EventPage
