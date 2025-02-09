import { createRoot } from 'react-dom/client';
import React from 'react';
import ErrorModal from '@components/ErrorModal';

export function showModal(errorMessage: string): void {
  const modalContainer = document.createElement('div');
  document.body.appendChild(modalContainer);
  const root = createRoot(modalContainer);

  const closeModal = () => {
    root.unmount();
    document.body.removeChild(modalContainer);
  };

  root.render(
    React.createElement(ErrorModal, {
      isOpen: true,
      onRequestClose: closeModal,
      errorMessage: errorMessage,
    })
  );
}