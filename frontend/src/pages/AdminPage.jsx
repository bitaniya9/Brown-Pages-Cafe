import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminEventCard from "../components/AdminEventCard";
import { getAllEvents, getAllReservations, getAllUsers } from "../api";
import "./Admin.css";

const AdminPage = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("events");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, [navigate]);

  // Unified data loader
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let result;
        if (tab === "events") result = await getAllEvents();
        else if (tab === "reservations") result = await getAllReservations();
        else if (tab === "users") result = await getAllUsers();
        setData(result || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [tab]);

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin Panel</h2>
        <ul>
          {["events", "reservations", "users"].map((t) => (
            <li
              key={t}
              className={tab === t ? "active" : ""}
              onClick={() => setTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </li>
          ))}
        </ul>
      </aside>

      <main className="admin-content">
        <header className="admin-header">
          <h1>{tab.toUpperCase()} MANAGEMENT</h1>
          <button className="hero-btn">+ Create New</button>
        </header>

        <section className="admin-panel">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title/Name</th>
                  <th>Date/Email</th>
                  <th>Type/Role</th>
                  <th>Capacity/Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <AdminEventCard
                    key={item._id || item.id}
                    item={item}
                    type={tab}
                  />
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
