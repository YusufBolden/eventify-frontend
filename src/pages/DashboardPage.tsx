import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axios";
import EventModal from "../modals/EventModal";
import type { Event } from "../types/Event";
import { FaTrash, FaPen } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/useAuth";

const DashboardPage = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("1");
  const [eventsPerPage, setEventsPerPage] = useState(3);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const view = queryParams.get("view") || "my";

  useEffect(() => {
    document.body.classList.remove("overflow-hidden");
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let endpoint = "/events/my-events";
        if (user?.isAdmin && view === "all") {
          endpoint = "/events";
        }
        if (user) {
          const res = await api.get(endpoint, {
            headers: { Authorization: `Bearer ${user.token}` },
          });
          setEvents(res.data);
        }
      } catch {
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, view]);

  const handleEventCreated = (newEvent: Event) => {
    setEvents((prev) => [...prev, newEvent]);
  };

  const handleEventUpdated = (updated: Event) => {
    setEvents((prev) =>
      prev.map((ev) => (ev._id === updated._id ? updated : ev))
    );
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });

      setEvents((prev) => {
        const updatedEvents = prev.filter((ev) => ev._id !== id);

        // if current page is now empty, move to previous or first page
        const totalPagesAfterDelete = Math.ceil(
          updatedEvents.length / eventsPerPage
        );
        if (currentPage > totalPagesAfterDelete) {
          setCurrentPage(totalPagesAfterDelete || 1);
          setInputPage(String(totalPagesAfterDelete || 1));
        }

        return updatedEvents;
      });

      toast.success("Event deleted successfully");
    } catch {
      toast.error("Failed to delete event");
    }
  };

  const openEditModal = (event: Event) => {
    setEventToEdit(event);
    setEditMode(true);
    setShowModal(true);
  };

  // prevents stale edit state when creating new events
  const openCreateModal = () => {
    setEditMode(false);
    setEventToEdit(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditMode(false);
    setEventToEdit(null);
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
    setInputPage("1");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Pagination
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLast = currentPage * eventsPerPage;
  const indexOfFirst = indexOfLast - eventsPerPage;
  const currentEvents = events.slice(indexOfFirst, indexOfLast);

  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      setInputPage(String(nextPage));
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      setCurrentPage(prevPage);
      setInputPage(String(prevPage));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handlePageJump = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const page = parseInt(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else {
      toast.error(`Page must be between 1 and ${totalPages}`);
      setInputPage(String(currentPage));
    }
  };

  return (
    <div className="px-4 py-8 text-[#4338CA]">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {user?.isAdmin
              ? view === "all"
                ? "All Events"
                : "My Events"
              : "My Events"}
          </h1>
          <div className="flex gap-2">
            <button
              onClick={openCreateModal}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              + Create Event
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>

        {loading && <p className="text-center">Loading...</p>}
        {error && events.length === 0 && (
          <p className="text-red-600 text-center mb-2">{error}</p>
        )}
        {!loading && events.length === 0 && (
          <p className="text-center text-gray-700">No events found.</p>
        )}

        <ul className="space-y-4">
          {currentEvents.map((event) => (
            <li
              key={event._id}
              onClick={() => navigate(`/events/${event._id}`)}
              className="bg-white shadow p-4 rounded-xl border border-[#6366F1] relative cursor-pointer"
            >
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(event);
                  }}
                  className="text-indigo-500 hover:text-indigo-700"
                  title="Edit"
                >
                  <FaPen />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(event._id);
                  }}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              {event.description && (
                <p className="text-sm text-gray-700 overflow-hidden max-h-20 text-ellipsis">
                  {event.description}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>

        {/* Page size selector */}
        <div className="flex justify-center mt-8 mb-4">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>Show</span>
            <select
              value={eventsPerPage}
              onChange={handlePageSizeChange}
              className="border rounded px-2 py-1"
            >
              <option value={3}>3</option>
              <option value={6}>6</option>
              <option value={9}>9</option>
            </select>
            <span>per page</span>
          </div>
        </div>

        {/* Pagination controls */}
        {events.length > eventsPerPage && (
          <div className="flex flex-wrap justify-center gap-4 text-lg font-semibold">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded border ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
                  : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              }`}
            >
              ← Prev
            </button>

            <form onSubmit={handlePageJump} className="flex items-center gap-2">
              <span>Page</span>
              <input
                type="number"
                value={inputPage}
                onChange={handleInputChange}
                className="w-16 text-center border border-gray-400 rounded px-2 py-1"
                min={1}
                max={totalPages}
              />
              <span>of {totalPages}</span>
            </form>

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              Next →
            </button>
          </div>
        )}
      </div>

      <EventModal
        isOpen={showModal}
        onClose={closeModal}
        onEventCreated={handleEventCreated}
        editMode={editMode}
        existingEvent={eventToEdit}
        onEventUpdated={handleEventUpdated}
      />
    </div>
  );
};

export default DashboardPage;
