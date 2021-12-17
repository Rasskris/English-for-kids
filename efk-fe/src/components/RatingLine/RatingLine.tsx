import { FC, memo } from 'react';
import { ANSWER } from '../../enums';
import styles from './RatingLine.module.scss';

interface RatingLineProps {
  userAnswers: ANSWER[];
}

export const RatingLine: FC<RatingLineProps> = memo(({ userAnswers }) => {
  return (
    <div className={styles.rating}>
      {userAnswers &&
        userAnswers.map((item, index) => (
          <span key={String(index)} className={`${styles.rating__item} ${styles[item]}`} />
        ))}
    </div>
  );
});

RatingLine.displayName = 'RatingLine';
