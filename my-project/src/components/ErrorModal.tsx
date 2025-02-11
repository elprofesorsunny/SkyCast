import React from 'react';
import Modal from 'react-modal';
import errorModalProps from '@types/errorModal.type';

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onRequestClose, errorMessage }) => {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Error"
      style={customStyles}
    >
      <h2>Error</h2>
      <p>{errorMessage}</p>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
};

export default ErrorModal;