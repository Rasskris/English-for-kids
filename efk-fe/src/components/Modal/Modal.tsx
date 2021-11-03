import { FC, ReactElement, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface ModalProps {
  isVisible: boolean;
  children: ReactElement;
}
export const Modal: FC<ModalProps> = ({ isVisible, children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const modalContent = isVisible ? (
    <div className={styles.modal}>
      <div className={styles.modal__wrapper}>{children}</div>
    </div>
  ) : null;

  return mounted ? createPortal(modalContent, document.getElementById('modal-root')) : null;
};
