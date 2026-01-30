import React from "react";
import BookTable from "../components/BookTable";
import Navbar from "../components/Navbar";
import ReviewSection from "../components/ReviewSection"; // We'll create this next

const Spaces = () => {
  // Get token from storage to pass down for authentication
  const token = localStorage.getItem("token");

  return (
    <main>
      {/* ================= READING SPACES ================= */}
      <section className="perfect-spot">
        <h2>Reading Spaces</h2>
        <p className="p-perfect-spot">Quiet areas for focus and relaxation</p>

        <div className="spot-cards">
          <div className="spot-card-1">
            <img
              src={
                new URL(
                  "../assets/aida-geraeva-533jd4Ew-Ww-unsplash.jpg",
                  import.meta.url,
                ).href
              }
              alt="Window seat"
            />
            <h3>Window Seat</h3>
            <p>Natural light and calm views.</p>
          </div>
          <div className="spot-card-2">
            <img
              src={
                new URL(
                  "../assets/coffeecurtains-vkU1CocWB4M-unsplash.jpg",
                  import.meta.url,
                ).href
              }
              alt="Cozy corner"
            />
            <h3>Cozy Corner</h3>
            <p>Private and quiet.</p>
          </div>
          <div className="spot-card-3">
            <img
              src={
                new URL(
                  "../assets/dorka-kardos-latif-aG6JgjpVDQ0-unsplash.jpg",
                  import.meta.url,
                ).href
              }
              alt="Group table"
            />
            <h3>Group Table</h3>
            <p>Study and collaboration.</p>
          </div>
        </div>
      </section>
      {/* ================= EATING AREAS ================= */}
      <section className="perfect-spot">
        <h2>Eating Areas</h2>
        <p className="p-perfect-spot">
          Comfortable spaces to enjoy meals and conversation
        </p>

        <div className="spot-cards">
          <div className="spot-card-1">
            <img
              src={new URL("../assets/diningArea.jpg", import.meta.url).href}
              alt="Dining hall"
            />
            <h3>Dining Hall</h3>
            <p>Spacious indoor seating.</p>
          </div>
          <div className="spot-card-2">
            <img
              src={new URL("../assets/WindowDining.jpg", import.meta.url).href}
              alt="Window dining"
            />
            <h3>Window Dining</h3>
            <p>Great views while you eat.</p>
          </div>
          <div className="spot-card-3">
            <img
              src={new URL("../assets/lounge-table.jpg", import.meta.url).href}
              alt="Lounge tables"
            />
            <h3>Lounge Tables</h3>
            <p>Relaxed & social.</p>
          </div>
        </div>

        <div className="reservation-top">
          <h2>Make a Reservation.</h2>
        </div>

        <BookTable />
      </section>
      {/* ================= REVIEWS SECTION ================= */}
      <section
        className="review-display-section"
        style={{ paddingBottom: "50px" }}
      >
        <ReviewSection token={token} />
      </section>
    </main>
  );
};

export default Spaces;
