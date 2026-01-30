import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function FeaturesCarousel() {
  const features = [
    {
      title: "Brown Pages Latte",
      img: "../assets/tabitha-turner-3n3mPoGko8g-unsplash.jpg",
      desc: "Made with freshly brewed coffee.",
    },
    {
      title: "Crispy Samosa",
      img: "../assets/prajakta-bagade-Vzvkp94lk_4-unsplash.jpg",
      desc: "Savor the taste of hot crunchy samosa",
    },
    {
      title: "Reading Nooks",
      img: "../assets/aspen-metzger-fYoyPmIZPAI-unsplash.jpg",
      desc: "Quiet place to read.",
    },
    {
      title: "Sandwich Bar",
      img: "../assets/sandwich.jpg",
      desc: "Fresh and delicious sandwiches.",
    },
    {
      title: "Cafe Ambiance",
      img: "../assets/cafe.jpg",
      desc: "Warm and inviting space perfect for relaxing.", 
    },
    {
      title: "Pastry Selection",
      img: "../assets/download (3).jpg",
      desc: "Daily fresh pastries, cakes, and desserts.",
    },
  ];

  return (
    <div className="carousel-container">
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView="auto"
        navigation
        loop={false}
      >
        {features.map((f, i) => (
          <SwiperSlide key={i}>
            <div className="one-feature-reading">
              <img src={new URL(f.img, import.meta.url).href} alt={f.title} />
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              {f.title === "Reading Nooks" && (
                <button className="reserve-btn">Reserve a Spot</button>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
