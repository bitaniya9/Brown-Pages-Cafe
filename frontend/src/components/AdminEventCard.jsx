import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const AdminEventCard = ({ item, type, hasActions, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const renderDetails = () => {
    switch (type) {
      case "events":
        return (
          <>
            <td data-label="Title" className="font-bold cell-main">
              {item.title}
            </td>
            <td data-label="Date" className="cell-stack">
              {new Date(item.date).toLocaleDateString()}
            </td>
            <td data-label="Type" className="cell-stack">
              <span className="badge">{item.type}</span>
            </td>
            <td data-label="Capacity" className="cell-stack">
              {item.capacity} Spots
            </td>
            {/* Functional Buttons in Table Data */}
            <td data-label="Action" className="cell-stack">
              <div className="action-btns-inline">
                <button
                  className="icon-btn-inline edit"
                  onClick={() => onEdit?.(item)}
                  title="Edit Event"
                >
                  <FontAwesomeIcon icon={faPen} />
                </button>
                <button
                  className="icon-btn-inline delete"
                  onClick={() => onDelete?.(item._id)}
                  title="Delete Event"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </td>
          </>
        );
      case "reservations":
        return (
          <>
            <td data-label="Name" className="font-bold cell-main">
              {item.userId?.name || "Guest"}
            </td>
            <td data-label="Table" className="cell-stack">
              Table: {item.table}
            </td>
            <td data-label="Date" className="cell-stack">
              {new Date(item.date?.$date || item.date).toLocaleDateString()}
            </td>
            <td data-label="Time" className="cell-stack">
              {item.timeSlot}
            </td>
            <td data-label="Guests" className="cell-stack">
              {item.guests} People
            </td>
            <td data-label="Status" className="cell-stack">
              <span className={`status-pill ${item.status}`}>
                {item.status}
              </span>
            </td>
          </>
        );
      case "users":
        return (
          <>
            <td data-label="Name" className="font-bold cell-main">
              {item.name}
            </td>
            <td data-label="Email" className="cell-stack">
              {item.email}
            </td>
            <td data-label="Role" className="cell-stack">
              <span className="role-tag">{item.role}</span>
            </td>
          </>
        );
      case "reviews":
        return (
          <>
            <td data-label="User" className="font-bold cell-main">
              {item.userId?.name || "Anonymous"}
            </td>
            <td data-label="Rating" className="cell-stack">
              {"⭐".repeat(item.rating)}
            </td>
            <td data-label="Comment" className="cell-stack italic">
              "{item.comment}"
            </td>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <tr className="admin-row">
      {renderDetails()}

      {/* Meatball Menu (Kept as fallback for other types or mobile) */}
      {hasActions && (
        <td className="cell-actions">
          <div className="meatball-container" ref={menuRef}>
            <button
              className="meatball-btn"
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              aria-label="Actions"
            >
              ⋮
            </button>
          </div>
        </td>
      )}
    </tr>
  );
};

export default AdminEventCard;
