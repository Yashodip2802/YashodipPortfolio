import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container" id="experience">
      <div className="career-container">
        <h2>
          My <span>Experience</span>
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Software Intern</h4>
                <h5>Tata Consultancy Services (TCS) · Patna</h5>
              </div>
              <h3>2025</h3>
            </div>
            <p>
              Completed an intensive software development internship at TCS, gaining valuable experience
              in corporate software engineering lifecycles and standard industry methodologies.
            </p>
            <a
              href="/Yashodip_sinha_TCS.pdf"
              target="_blank"
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
                marginTop: "15px",
                textDecoration: "none",
                width: "fit-content"
              }}
            >
              View Certificate
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
