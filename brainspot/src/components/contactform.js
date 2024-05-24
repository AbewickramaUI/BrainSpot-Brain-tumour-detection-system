import React from 'react';
import './login.css';

function ContactForm() {
  return (
    <div>
      <form>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />

        <label htmlFor="username">Username</label>
        <input type="text" id="username" />

        <label htmlFor="password">Password</label>
        <input type="password" id="password" />

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ContactForm;







