import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="footer-logo">
        Brown Pages Cafe
      </Link>

      <nav className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/events">Events</Link>
        <Link to="/contacts">Contacts</Link>
      </nav>

      <small>© {new Date().getFullYear()} Brown Pages Cafe</small>
    </footer>
  );
}

export default Footer;
