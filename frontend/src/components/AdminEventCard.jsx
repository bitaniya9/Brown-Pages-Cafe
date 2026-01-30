import React from "react";

const AdminEventCard = ({ item, type }) => {
  // Logic to handle different data shapes (Events vs Reservations vs Users)
  const col1 = item.title || item.name;
  const col2 = item.date || item.email;
  const col3 = item.type || item.role;
  const col4 = item.capacity || "Active";

  return (
    <tr>
      <td className="font-bold">{col1}</td>
      <td>{col2}</td>
      <td>{col3}</td>
      <td>{col4}</td>
      <td>
        <div className="table-actions">
          <button className="btn-edit">Edit</button>
          <button className="btn-delete">Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default AdminEventCard;
