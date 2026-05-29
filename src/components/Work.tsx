import { useState, useCallback } from "react";
import "./styles/Work.css";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "MCTI",
    category: "Multi-Chain Token Indexer",
    tools: "MetaMask & Phantom, WebSockets, APIs, Blockchain",
    image: "/Screenshot 2026-04-26 234532.png",
    link: "https://mcti-project.vercel.app/",
  },
  {
    title: "DEEPTRUST",
    category: "Blockchain AI Authenticity",
    tools: "TypeScript, Deepfake Detection, Smart Contracts",
    image: "/futuristic-tech-hub-stockcake.webp",
    link: "https://deeptrust-steel.vercel.app",
  },
  {
    title: "Portfolio",
    category: "Interactive 3D Portfolio",
    tools: "React, Three.js, R3F, GSAP ScrollTrigger",
    image: "/bitmoji.png",
    link: "https://yashodip.vercel.app/",
  },
  {
    title: "E-Commerce",
    category: "Responsive Shopping Website",
    tools: "HTML5, Vanilla CSS, JS, Shopping Cart Logic",
    image: "/actual_certificate.jpg",
    link: "https://github.com/Yashodip2802/ecommerce-website",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content" style={{ justifyContent: "center" }}>
                    <div className="carousel-info" style={{ justifyContent: "center", width: "100%", maxWidth: "800px", margin: "auto" }}>
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details" style={{ flex: 1 }}>
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools & Features</span>
                          <p>{project.tools}</p>
                        </div>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noreferrer"
                          className="exp-cert-btn mag-btn"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                            padding: "8px 15px",
                            border: "1px solid var(--accentColor)",
                            color: "var(--accentColor)",
                            borderRadius: "20px",
                            fontSize: "0.85rem",
                            marginTop: "20px",
                            textDecoration: "none",
                            width: "fit-content"
                          }}
                        >
                          View Project <MdArrowForward style={{ transform: "rotate(-45deg)", marginLeft: "2px" }} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
