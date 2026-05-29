import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/yashodipsinha2802"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — yashodipsinha2802
              </a>
            </p>
            <h4>Education</h4>
            <p>
              B.Tech in Computer Science Engineering, Jaypee University of Engineering and Technology, Guna — 2023–2027
            </p>
            <p>
              Senior Secondary Schooling, St. Aloysius Sr. Sec. School, Jabalpur — Pass 2023
            </p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/Yashodip2802"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/yashodipsinha2802"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://wa.me/918103029909"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              WhatsApp <MdArrowOutward />
            </a>
            <a
              href="mailto:yashodipsinha406@gmail.com"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Email <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Yashodip Sinha</span>
            </h2>
            <h5>
              <MdCopyright /> 2026 Yashodip Sinha
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
