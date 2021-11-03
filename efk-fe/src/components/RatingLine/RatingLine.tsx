import { FC } from 'react';
import { ANSWER } from '../../constants';
import styles from './RatingLine.module.scss';

interface RatingLineProps {
  userAnswers: ANSWER[];
}

export const RatingLine: FC<RatingLineProps> = ({ userAnswers }) => {
  return (
    <div className={styles.rating}>
      {userAnswers &&
        userAnswers.map((item, index) => (
          <span key={String(index)} className={`${styles.rating__item} ${styles[item]}`} />
        ))}
    </div>
  );
};
