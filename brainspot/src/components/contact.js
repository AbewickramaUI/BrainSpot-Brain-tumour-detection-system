import React, { useState } from 'react';
import './about.css';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import ContactForm from './contactform';

function Contact() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="about-container">
      <div className="background-image">
        <div className="content">
          <h4>About Us</h4>
          <p>Contact us for more information</p>
          <p>Feel free to reach out to our tech team</p>
          <button onClick={openModal} className="more-info-button">More Information</button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Contact Form</h2>
        <ContactForm />
        <button onClick={closeModal} className="close-button">Close</button>
      </Modal>
    </div>
  );
}

export default Contact;
