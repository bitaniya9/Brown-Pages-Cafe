import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AdminEventCard from "../components/AdminEventCard";
import {
  getAllEvents,
  getAllReservations,
  getAllReviewsAdmin,
  getAllUsers,
  updateEvent,
  deleteEvent,
} from "../api";
import { toast } from "react-toastify";
import "./Admin.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("events");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Modal State - Simplified for Editing Only
  const [isModalOpen, setIsModalOpen] = useState(false); //edit modal
  const [currentEvent, setCurrentEvent] = useState(null); //currently

  const tableHeaders = {
    events: ["Title", "Date", "Type", "Capacity", "Actions"],
    reservations: [
      "Name",
      "Table",
      "Booked Date",
      "Time slot",
      "Guests",
      "Status",
    ],
    users: ["Name", "Email", "Role"],
    reviews: ["User", "Rating", "Comment"],
  };

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let result;
      if (tab === "events") result = await getAllEvents();
      else if (tab === "reservations") result = await getAllReservations();
      else if (tab === "users") result = await getAllUsers();
      else if (tab === "reviews") result = await getAllReviewsAdmin();

      const finalData = Array.isArray(result)
        ? result
        : result.reviews || result.data || [];
      setData(finalData);
    } catch (error) {
      console.error("Fetch error:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
    fetchData();
  }, [navigate, fetchData]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      try {
        await deleteEvent(id);
        setData((prev) => prev.filter((item) => (item._id || item.id) !== id));
        toast.info("Event deleted successfully!");
      } catch (err) {
        toast.info(err.message);
      }
    }
  };

  const openEditModal = (item) => {
    setCurrentEvent({
      ...item,
      date: new Date(item.date).toISOString().split("T")[0],
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentEvent(null);
  };

  const handleModalInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      // Logic only for updating existing events
      await updateEvent(currentEvent._id, currentEvent);
      toast.info("Event updated successfully!");
      closeModal();
      fetchData();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="admin-container">
      <button
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "✕" : "☰"}
      </button>

      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${isSidebarOpen ? "open" : ""}`}>
        <h2>Admin Panel</h2>
        <ul>
          {Object.keys(tableHeaders).map((t) => (
            <li
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => {
                setTab(t);
                setIsSidebarOpen(false);
              }}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <h1>{tab.toUpperCase()} MANAGEMENT</h1>
          {/* Create button has been removed from here */}
        </header>

        <section className="table-wrapper">
          {loading ? (
            <p>Loading...</p>
          ) : data.length > 0 ? (
            <table className="admin-table">
              <thead>
                <tr>
                  {tableHeaders[tab]?.map((header) => (
                    <th
                      key={header}
                      className={header === "Actions" ? "" : "hide-mobile"}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <AdminEventCard
                    key={item._id || item.id}
                    item={item}
                    type={tab}
                    hasActions={tab === "events"}
                    onEdit={openEditModal}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <p className="status-msg">No data found</p>
          )}
        </section>
      </main>

      {isModalOpen && currentEvent && (
        <div className="modal-overlay">
          <div className="modal-content square-modal">
            <h3>Edit Event</h3>
            <form onSubmit={handleModalSubmit} className="modal-grid-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={currentEvent.title}
                    onChange={handleModalInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    name="date"
                    value={currentEvent.date}
                    onChange={handleModalInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Type</label>
                  <select
                    name="type"
                    value={currentEvent.type}
                    onChange={handleModalInputChange}
                    required
                  >
                    <option value="poetry_night">Poetry Night</option>
                    <option value="book_club">Book Club</option>
                    <option value="signing">Signing</option>
                    <option value="flavor_exploration">
                      Flavor exploration
                    </option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Capacity</label>
                  <input
                    type="number"
                    name="capacity"
                    value={currentEvent.capacity}
                    onChange={handleModalInputChange}
                    required
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="hero-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
