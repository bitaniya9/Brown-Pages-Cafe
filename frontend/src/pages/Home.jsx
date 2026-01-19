// import React from "react";

// const Home = () => {
//   return (
//     <div>
//       <h1>Welcome to Brown Pages Cafe</h1>
//     </div>
//   );
// };

// // THIS IS THE LINE YOU ARE LIKELY MISSING:
// export default Home;

// import React, { useState, useEffect } from "react";
import React from "react";
import Navbar from "../components/Navbar";
import FeaturesCarousel from "../components/Feature.slider";

function Home() {
  // const handleJoinEvent = () => {
  //   alert("This would take you to events page!");
  //   console.log("Join event clicked");
  // };

  // const handleReserveSpot = () => {
  //   alert("Reservation feature coming soon!");
  //   console.log("Reserve spot clicked");
  // };

  // const handleExploreMenu = () => {
  //   alert("Menu page coming soon!");
  //   console.log("Explore menu clicked");
  // };

  return (
    <div className="home-page">
      {/* <Navbar /> */}
      <section id="hero-section">
        <img
          className="hero-img"
          src={
            new URL(
              "../assets/yutaka-toshiro-xoKbH8VERR0-unsplash.jpg",
              import.meta.url,
            ).href
          }
          alt="a cafe with bookshelves in a corner"
        />
        <div className="hero-txt">
          <h1>Sip. Read. Relax.</h1>
          <p>Your cozy space for great coffee and quiet reading.</p>
          <div className="hero-interactive">
            <a href="#menu" className="hero-btn">
              Explore Menu
            </a>
            {/* <button className="hero-btn">Join Next Event</button> */}
          </div>
        </div>
      </section>

      {/* Welcome section */}
      <section className="features-area">
        <p className="intro">
          Welcome to <i>Brown Pages Cafe</i>. A place where you can relax, work,
          read and create while enjoying delicious drinks and pastries. Whether
          you are here to work, read, write, study or relax with your favorite
          coffee and snacks - our cafe is designed to feel like home.
          <br className="break" />
          More than just a cafe we are a community of book lovers, students and
          anyone who enjoys quiet calm places. Join us for poetry nights, book
          clubs or even to get your book signed by your favorite author. Welcome
          to one of your favorite spots in town.
        </p>

        <h2>What are we known for?</h2>
        <FeaturesCarousel />
      </section>

      <h2 className="h2-chef-intro">
        Meet the Artisans Behind the Brown Pages Flavor
      </h2>

      <div className="staff-intro">
        <section className="chef-intro reverse">
          <img
            src={
              new URL(
                "../assets/premium_photo-1677852284473-b15f23b65643.jpeg",
                import.meta.url,
              ).href
            }
            className="head-chef"
            alt="A man cooking"
          />
          <div className="chef-text">
            <h3>Johnathan Hans: Head Chef</h3>
            <p>
              Johnathan has served in the culinary industry for about 3 years
              now. He makes sure that each plate brings with it comfort and
              flavor to be savored. Johnathan has a way of making you wish his
              cookings/pastries never come to an end. He keeps things simple,
              fresh and delicious. From pastries, toasted sandwiches to light
              snacks, he crafts every bite to be comforting and easy to enjoy
              while you study, work, read or relax.
            </p>
            <p>Favorite book: The Alchemist by Paulo Coelho</p>
          </div>
        </section>

        <section className="barista-intro">
          <img
            className="barista-img"
            src={
              new URL(
                "../assets/429d9ec9-692a-4026-bd0a-885567ae7ac0 - Copy.jpeg",
                import.meta.url,
              ).href
            }
            alt="a female barista smiling"
          />
          <div className="barista-text">
            <h3>Maya Hailu: Barista and Event Organizer</h3>
            <p>
              Maya crafts each latte and pour-over with precision and warmth.
              She isn't just the flavor architect of your favorite latte, she is
              the mind and heart behind the cafe's reading culture. She is
              passionate about both coffee and literature, she takes time to
              organize poetry nights, book clubs and book signings. She is
              either experimenting with new brews or recommending your next
              great read.
            </p>
            <p>Favorite book: The Three Musketeers by Alexandre Dumas</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
