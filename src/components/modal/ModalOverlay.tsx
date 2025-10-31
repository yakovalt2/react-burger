import React from 'react';
import styles from './modal.module.css';

type Props = {
  onClick: () => void;
};

const ModalOverlay: React.FC<Props> = ({ onClick }) => {
  return <div className={styles.overlay} onClick={onClick}></div>;
};

export default ModalOverlay;