import { FC, ReactFragment } from 'react';
import styles from './CardsContainer.module.scss';

interface CardsContainerProps {
  children: ReactFragment;
}

export const CardsContainer: FC<CardsContainerProps> = ({ children }) => {
  return <div className={styles.cards}>{children}</div>;
};
