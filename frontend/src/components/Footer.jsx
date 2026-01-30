import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1: Brand */}
        <div className="footer-section">
          <Link to="/" className="footer-logo">
            Brown Pages Cafe
          </Link>
          <p className="footer-tagline">Sip, Read, Relax.</p>
        </div>

        {/* Section 2: (removed navigation) */}

        {/* Section 3: Contacts */}
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>
            Email:{" "}
            <a href="mailto:brownpages@gmail.com">brownpages@gmail.com</a>
          </p>
          <p>
            Phone: <a href="tel:+251922222222">(+251) 922 22 22 22</a>
          </p>
          <p>
            Location: <Link to="/spaces">Bole, behind SKB Tower</Link>
          </p>
          <p className="social">
            Follow us: {/* mock Instagram link */}
            <a
              href="https://instagram.com/brownpagescafe"
              target="_blank"
              rel="noopener noreferrer"
              className="instagram-link"
            >
              <FontAwesomeIcon icon={faInstagram} /> @brownpagescafe
            </a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <small>© {new Date().getFullYear()} Brown Pages Cafe</small>
      </div>
    </footer>
  );
}

export default Footer;
