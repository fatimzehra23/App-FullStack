import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

const MyToast = ({ show, message, type = 'success', onClose }) => {
  const bgColor = type === 'success' ? 'success' : 'danger';
  const icon = type === 'success' ? faCheckCircle : faExclamationCircle;
  const title = type === 'success' ? 'Succès' : 'Erreur';

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 9999 }}>
      <Toast
        show={show}
        onClose={onClose}
        delay={3000}
        autohide
        bg={bgColor}
      >
        <Toast.Header closeButton={true}>
          <FontAwesomeIcon icon={icon} className="me-2" />
          <strong className="me-auto">{title}</strong>
          <small>À l'instant</small>
        </Toast.Header>
        <Toast.Body className="text-white">
          {message}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default MyToast;