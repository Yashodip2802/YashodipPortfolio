import "./styles/Education.css";
import { FaCalendarDays } from "react-icons/fa6";

const Education = () => {
  return (
    <div className="education-section section-container" id="education">
      <div className="education-container">
        <h2>
          My <span>Education</span>
        </h2>
        <div className="edu-grid">
          {/* Card 1: JUET */}
          <div className="edu-card ec-current">
            <div className="edu-status current-dot"></div>
            <img src="/jaypee_university.jpg" alt="JUET" className="edu-img" />
            <div className="edu-info">
              <span className="edu-badge eb-current">Current</span>
              <h4>B.Tech in Computer Science Engineering</h4>
              <p className="edu-org">Jaypee University of Engineering and Technology, Guna</p>
              <p className="edu-year">
                <FaCalendarDays /> 2023 – 2027
              </p>
            </div>
          </div>

          {/* Card 2: St. Aloysius */}
          <div className="edu-card">
            <div className="edu-status"></div>
            <img src="/st_aloysius.jpg" alt="St. Aloysius" className="edu-img" />
            <div className="edu-info">
              <span className="edu-badge eb-done">Completed</span>
              <h4>Senior Secondary Schooling</h4>
              <p className="edu-org">St. Aloysius Sr. Sec. School, Jabalpur</p>
              <p className="edu-year">
                <FaCalendarDays /> 2023 Passout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
