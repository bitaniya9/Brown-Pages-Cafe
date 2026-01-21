import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        Brown Pages Cafe
      </Link>

      <button className="nav-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      <nav className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/" onClick={() => setOpen(false)}>
          Home
        </Link>
        <Link to="/menu" onClick={() => setOpen(false)}>
          Menu
        </Link>
        <Link to="/events" onClick={() => setOpen(false)}>
          Events
        </Link>
        <Link to="/spaces" onClick={() => setOpen(false)}>
          Spaces
        </Link>

        {isLoggedIn ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </nav>
    </header>
  );
}
export default Navbar;
