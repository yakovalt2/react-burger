import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import ModalOverlay from './ModalOverlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const modalRoot = document.getElementById('react-modals') as HTMLElement;

const Modal: React.FC<ModalProps> = ({ onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Детали ингредиента</h2>
          <button className={styles.closeBtn} onClick={onClose}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};

export default Modal;