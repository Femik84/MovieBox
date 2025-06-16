import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "./assets/image/1.png";
import img2 from "./assets/image/2.png";
import img3 from "./assets/image/3.png";
import img4 from "./assets/image/4.png";
import img5 from "./assets/image/5.png";
import img6 from "./assets/image/6.png";
import searchIcon from "./assets/image/search.png";
import squidGameVideo from "./assets/video/squidgame.mp4";

const movies = [
  {
    title: "Game of Thrones",
    year: "2011",
    age: "17+",
    seasons: "6 Seasons",
    genre: "Drama",
    img: img1,
    video: squidGameVideo,
    description:
      "Noble families fight for control over the Iron Throne and the Seven Kingdoms of Westeros, as ancient forces rise and a deadly winter approaches.",
  },
  {
    title: "One Piece",
    year: "1999",
    age: "13+",
    seasons: "1000+ EP",
    genre: "Action",
    img: img2,
    video: squidGameVideo,
    description:
      "Follow Monkey D. Luffy and his pirate crew on a wild adventure across the seas, chasing the legendary treasure known as One Piece and battling epic foes.",
  },
  {
    title: "Shogun",
    year: "2021",
    age: "16+",
    seasons: "1 Season",
    genre: "Drama",
    img: img3,
    video: squidGameVideo,
    description:
      "Set in 17th-century Japan, an English navigator finds himself caught in a web of political intrigue, war, and culture shock while becoming entangled in the samurai way of life.",
  },
  {
    title: "Demon Slayer",
    year: "2019",
    age: "17+",
    seasons: "4 Seasons",
    genre: "Action",
    img: img4,
    video: squidGameVideo,
    description:
      "After his family is slaughtered by demons, Tanjiro Kamado joins the Demon Slayer Corps to avenge them and protect his sister, who has become a demon herself.",
  },
  {
    title: "Squid Game",
    year: "2021",
    age: "16+",
    seasons: "2 Seasons",
    genre: "Drama",
    img: img5,
    video: squidGameVideo,
    description:
      "Hundreds of cash-strapped contestants accept a strange invitation to compete in children's games. Inside, a deadly survival game unfolds for a ₩45.6 billion prize.",
  },
  {
    title: "Jujutsu Kaisen (TV)",
    year: "2020",
    age: "17+",
    seasons: "2 Seasons",
    genre: "Action",
    img: img6,
    video: squidGameVideo,
    description:
      "Yuji Itadori joins a secret organization to fight Cursed Spirits after he consumes a powerful cursed object to save his friends. Intense battles and dark magic await.",
  },
];

const MovieCarousel = () => {
  const sidebarRef = useRef(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [playingIndex, setPlayingIndex] = useState(null);

  const openSidebar = () => {
    sidebarRef.current.classList.remove("close-sidebar");
    sidebarRef.current.classList.add("open-sidebar");
    setShowSidebar(true);
  };

  const closeSidebar = () => {
    sidebarRef.current.classList.remove("open-sidebar");
    sidebarRef.current.classList.add("close-sidebar");
    setShowSidebar(false);
  };

  useEffect(() => {
    AOS.init({ duration: 2000 });

    const nextDom = document.getElementById("next");
    const prevDom = document.getElementById("prev");
    const carouselDom = document.querySelector(".carousel");
    const SliderDom = carouselDom.querySelector(".carousel .list");
    const thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
    const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");

    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);

    const timeRunning = 2000;
    let runTimeOut;

    function showSlider(type) {
      const SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
      const thumbnailItemsDom = document.querySelectorAll(".carousel .thumbnail .item");

      if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add("next");
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add("prev");
      }

      clearTimeout(runTimeOut);
      runTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next");
        carouselDom.classList.remove("prev");
      }, timeRunning);
    }

    nextDom.onclick = () => showSlider("next");
    prevDom.onclick = () => showSlider("prev");
  }, []);

  return (
    <div className="movie-carousel">
      <header data-aos="fade-down">
        <h1>
          <span style={{ color: "#ff0040" }}>MD</span>VD
        </h1>

        <nav className="desktop-nav">
          <a href="#">Home</a>
          <a href="#">Movie</a>
          <a href="#">Anime</a>
          <a href="#">Series</a>
        </nav>

        <div className="search-box hide-on-mobile">
          <img src={searchIcon} alt="search-icon" />
          <input type="text" name="Search" placeholder="Search" />
        </div>

        <div className="menu-icon show-on-mobile" onClick={openSidebar}>
          <i className="bx bx-menu"></i>
        </div>
      </header>

      <div ref={sidebarRef} className="sidebar close-sidebar">
        <div className="close-icon" onClick={closeSidebar}>
          <i className="bx bx-x"></i>
        </div>

        <div className="search-box sidebar-search">
          <img src={searchIcon} alt="search-icon" />
          <input type="text" name="Search" placeholder="Search" />
        </div>

        <ul>
          <li><a href="#" onClick={closeSidebar}>Home</a></li>
          <li><a href="#" onClick={closeSidebar}>Movie</a></li>
          <li><a href="#" onClick={closeSidebar}>Anime</a></li>
          <li><a href="#" onClick={closeSidebar}>Series</a></li>
        </ul>
      </div>

      <div className="carousel">
        <div className="list">
          {movies.map((movie, index) => (
            <div className="item" key={index} data-aos="zoom-in">
              <img src={movie.img} alt={movie.title} />
              <div className="content">
                <h1>{movie.title}</h1>
                <div className="details">
                  <p>{movie.year}</p>
                  <p>{movie.age}</p>
                  <p>{movie.seasons}</p>
                  <p>{movie.genre}</p>
                </div>
                <h4 className="description">{movie.description}</h4>
                <div className="buttons">
                  <button className="download-btn">Download</button>
                  <button className="trailer-btn">Trailer</button>
                </div>

                <div className="vid-box">
                  {playingIndex === index ? (
                    <video
                      controls
                      autoPlay
                      className="vid-trailer"
                      poster={movie.img}
                    >
                      <source src={movie.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div
                      className="video-poster"
                      style={{
                        backgroundImage: `url(${movie.img})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        position: "relative",
                        width: "100%",
                        paddingTop: "56.25%",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }}
                      onClick={() => setPlayingIndex(index)}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          background: "rgba(0, 0, 0, 0.6)",
                          borderRadius: "50%",
                          padding: "15px",
                        }}
                      >
                        <i className="bx bx-play" style={{ fontSize: "32px", color: "#fff" }}></i>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="thumbnail">
          {movies.map((movie, index) => (
            <div className="item" key={index} data-aos="fade-up">
              <img src={movie.img} alt={movie.title} />
              <div className="thum-content">
                <div className="title">{movie.title}</div>
                <div className="description">
                  {movie.genre} - {movie.seasons}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="arrows">
          <button id="prev">&lt;</button>
          <button id="next">&gt;</button>
        </div>

        <div className="time"></div>
      </div>
    </div>
  );
};

export default MovieCarousel;
