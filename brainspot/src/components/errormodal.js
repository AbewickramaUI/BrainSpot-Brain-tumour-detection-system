import React from 'react';
import Modal from 'react-modal';

const ErrorModal = ({ isOpen, onClose, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Modal"
    >
      <div>
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </Modal>
  );
};

export default ErrorModal;
