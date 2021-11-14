import { FC, ReactFragment } from 'react';
import styles from './CardsContainer.module.scss';

interface CardsContainerProps {
  children: ReactFragment;
}

export const CardsContainer: FC<CardsContainerProps> = ({ children }) => {
  return <section className={styles.cards}>{children}</section>;
};
