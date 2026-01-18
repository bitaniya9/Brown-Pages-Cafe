// src/layouts/RootLayout.jsx
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="app-layout">
      <Outlet />
    </div>
  );
};

export default RootLayout;
