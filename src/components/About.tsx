import "./styles/About.css";

const About = () => {
  return (
    <div className="about-section" id="about">
      <div className="about-container">
        <div className="about-photo-wrapper">
          <div className="photo-frame-wrap">
            <div className="photo-glow-ring"></div>
            <img src="/professional_photo.jpeg" alt="Yashodip Sinha" className="about-photo" />
            <div className="photo-corner pc-tl"></div>
            <div className="photo-corner pc-br"></div>
          </div>
        </div>
        <div className="about-me">
          <h3 className="title">About Me</h3>
          <p className="para">
            I'm a passionate Full-Stack Developer and tech enthusiast with a strong
            foundation in modern web technologies and blockchain development. Currently
            pursuing a B.Tech in Computer Science Engineering at Jaypee University of
            Engineering and Technology (JUET), Guna. Driven by curiosity, I constantly
            explore emerging technologies to craft innovative digital solutions—from real-time
            blockchain analytics to fluid, interactive UI/UX experiences.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
