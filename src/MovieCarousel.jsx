import React, { useState, useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import img1 from "./assets/image/1.png";
import img2 from "./assets/image/2.png";
import img3 from "./assets/image/3.png";
import img4 from "./assets/image/4.png";
import img5 from "./assets/image/5.png";
import img6 from "./assets/image/6.png";
import searchIcon from "./assets/image/search.png";
import loaderImage from "./assets/image/koload.jpg";
import squidGameVideo from "./assets/video/squidgame.mp4";

const MOVIES = [
  { title: "Game of Thrones", img: img1, video: squidGameVideo, year: "2011", age: "17+", seasons: "6 Seasons", genre: "Drama", description: "Noble families fight for control over the Iron Throne and the Seven Kingdoms of Westeros, as ancient forces rise and a deadly winter approaches." },
  { title: "One Piece", img: img2, video: squidGameVideo, year: "1999", age: "13+", seasons: "1000+ EP", genre: "Action", description: "Follow Monkey D. Luffy and his pirate crew on a wild adventure across the seas, chasing the legendary treasure known as One Piece and battling epic foes." },
  { title: "Shogun", img: img3, video: squidGameVideo, year: "2021", age: "16+", seasons: "1 Season", genre: "Drama", description: "Set in 17th-century Japan, an English navigator finds himself caught in a web of political intrigue, war, and culture shock while becoming entangled in the samurai way of life." },
  { title: "Demon Slayer", img: img4, video: squidGameVideo, year: "2019", age: "17+", seasons: "4 Seasons", genre: "Action", description: "After his family is slaughtered by demons, Tanjiro Kamado joins the Demon Slayer Corps to avenge them and protect his sister, who has become a demon herself." },
  { title: "Squid Game", img: img5, video: squidGameVideo, year: "2021", age: "16+", seasons: "2 Seasons", genre: "Drama", description: "Hundreds of cash-strapped contestants accept a strange invitation to compete in children's games. Inside, a deadly survival game unfolds for a ₩45.6 billion prize." },
  { title: "Jujutsu Kaisen (TV)", img: img6, video: squidGameVideo, year: "2020", age: "17+", seasons: "2 Seasons", genre: "Action", description: "Yuji Itadori joins a secret organization to fight Cursed Spirits after he consumes a powerful cursed object to save his friends. Intense battles and dark magic await." },
];

// Loader component with image, text, and spinner
const Loader = () => (
  <div className="loader-overlay">
    <div className="loader-content">
      <img src={loaderImage} alt="Loading..." className="loader-image" />
      <div className="loader-text">Ẹ fi lẹ, ẹ jẹ́ kó lọad</div>
      <div className="loader-spinner"></div>
    </div>
  </div>
);

const SearchBox = ({ className = "" }) => (
  <div className={`search-box ${className}`}>
    <img src={searchIcon} alt="search icon" />
    <input type="text" name="Search" placeholder="Search" />
  </div>
);

const Navigation = ({ onClick }) => (
  <nav className="desktop-nav">
    <a href="#" onClick={onClick}>Home</a>
    <a href="#" onClick={onClick}>Movie</a>
    <a href="#" onClick={onClick}>Anime</a>
    <a href="#" onClick={onClick}>Series</a>
  </nav>
);

const MovieCarousel = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  // thumbnailOrder holds the current order of movie indices for thumbnails and main display
  const [thumbnailOrder, setThumbnailOrder] = useState(MOVIES.map((_, idx) => idx));
  const [playingIndex, setPlayingIndex] = useState(null);
  const [assetsLoaded, setAssetsLoaded] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  // For loader: all images (main + thumbs) + 1 video
  const totalAssets = MOVIES.length * 2 + 1;

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);

  useEffect(() => {
    if (assetsLoaded >= totalAssets) {
      setTimeout(() => setAllLoaded(true), 300);
    }
  }, [assetsLoaded, totalAssets]);

  const videoRef = useRef();

  // Main carousel always shows MOVIES[thumbnailOrder[0]]
  const currentIndex = 0;

  // Next: rotate thumbnails left and reset trailer
  const handleNext = () => {
    setThumbnailOrder(order => [...order.slice(1), order[0]]);
    setPlayingIndex(null);
  };

  // Prev: rotate thumbnails right and reset trailer
  const handlePrev = () => {
    setThumbnailOrder(order => [order[order.length - 1], ...order.slice(0, order.length - 1)]);
    setPlayingIndex(null);
  };

  // Click on thumbnail: rotate so that clicked index is first (main) and reset trailer
  const handleThumbnailClick = (movieIdx) => {
    setThumbnailOrder(order => {
      const clickedIdx = order.indexOf(movieIdx);
      return [...order.slice(clickedIdx), ...order.slice(0, clickedIdx)];
    });
    setPlayingIndex(null);
  };

  // Side bar
  const openSidebar = () => setShowSidebar(true);
  const closeSidebar = () => setShowSidebar(false);

  // Keyboard navigation for carousel
  const handleKeyDown = (e) => {
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
  };

  const handleAssetLoad = () => setAssetsLoaded((count) => count + 1);

  return (
    <div className="movie-carousel" tabIndex={0} onKeyDown={handleKeyDown}>
      {!allLoaded && <Loader />}

      {/* Hidden preloads */}
      <div style={{ display: "none" }}>
        {MOVIES.map((movie, idx) => (
          <img key={movie.img + "-preload"} src={movie.img} alt="" onLoad={handleAssetLoad} />
        ))}
        {MOVIES.map((movie, idx) => (
          <img key={movie.img + "-thumb-preload"} src={movie.img} alt="" onLoad={handleAssetLoad} />
        ))}
        <video ref={videoRef} src={MOVIES[0].video} onCanPlayThrough={handleAssetLoad} />
      </div>

      <header data-aos="fade-down">
        <h1>
          <span style={{ color: "#ff0040" }}>MD</span>VD
        </h1>
        <Navigation />
        <SearchBox className="hide-on-mobile" />
        <button
          className="menu-icon show-on-mobile"
          onClick={openSidebar}
          aria-label="Open menu"
        >
          <i className="bx bx-menu"></i>
        </button>
      </header>

      <div className={`sidebar ${showSidebar ? "open-sidebar" : "close-sidebar"}`}>
        <button
          className="close-icon"
          onClick={closeSidebar}
          aria-label="Close menu"
        >
          <i className="bx bx-x"></i>
        </button>
        <SearchBox className="sidebar-search" />
        <ul>
          <li><a href="#" onClick={closeSidebar}>Home</a></li>
          <li><a href="#" onClick={closeSidebar}>Movie</a></li>
          <li><a href="#" onClick={closeSidebar}>Anime</a></li>
          <li><a href="#" onClick={closeSidebar}>Series</a></li>
        </ul>
      </div>

      <div className="carousel" style={{ visibility: allLoaded ? "visible" : "hidden" }}>
        <div className="list">
          {[MOVIES[thumbnailOrder[0]]].map((movie, index) => (
            <div className="item" key={movie.title} data-aos="zoom-in">
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
                  <button
                    className="trailer-btn"
                    onClick={() =>
                      setPlayingIndex(
                        playingIndex === index ? null : currentIndex
                      )
                    }
                  >
                    {playingIndex === index ? "Hide Trailer" : "Trailer"}
                  </button>
                </div>
                <div className="vid-box">
                  {playingIndex === index ? (
                    <div>
                      <video
                        controls
                        autoPlay
                        className="vid-trailer"
                        poster={movie.img}
                      >
                        <source src={movie.video} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <button
                        onClick={() => setPlayingIndex(null)}
                        className="close-video-btn"
                        aria-label="Close trailer"
                      >
                        ×
                      </button>
                    </div>
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
                      aria-label="Play trailer"
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
          {thumbnailOrder.map((movieIdx) => {
            const movie = MOVIES[movieIdx];
            return (
              <div
                className={`item${movieIdx === thumbnailOrder[0] ? " active" : ""}`}
                key={movie.title}
                data-aos="fade-up"
                onClick={() => handleThumbnailClick(movieIdx)}
                style={{ cursor: "pointer" }}
                aria-label={`View ${movie.title}`}
              >
                <img src={movie.img} alt={movie.title} />
                <div className="thum-content">
                  <div className="title">{movie.title}</div>
                  <div className="description">
                    {movie.genre} - {movie.seasons}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="arrows">
          <button onClick={handlePrev} aria-label="Previous">
            &lt;
          </button>
          <button onClick={handleNext} aria-label="Next">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;