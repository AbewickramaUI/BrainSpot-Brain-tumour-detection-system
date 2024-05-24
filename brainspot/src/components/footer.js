import React from 'react';
import './FooterStyles.css';

class Footer extends React.Component {
  render() {
    return (
      
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section">
            <br />
            <h3>About Us</h3>
            <p>
            We are dedicated to revolutionizing brain tumour detection 
            using MRI scans. 
            By taking this sophisticated medical imaging technology to next level.
            </p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3> 
            <p>Email: abewickrama.ui@gmail.com</p>
            <p>Phone: +94778327345</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-media">
              <a href="#">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 BrainSpot. All rights reserved.</p>
        </div>
      </footer>
    );
  }
}

export default Footer;
