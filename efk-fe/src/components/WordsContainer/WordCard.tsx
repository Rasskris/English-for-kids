import { FC } from 'react';
import classnames from 'classnames';
import { Word } from '../../interfaces';
import { useAppSelector } from '../../hooks';
import { selectGameMode } from '../../redux/selectors';
import { GAME_MODE } from '../../constants';
import styles from './wordCard.module.scss';

interface WordCardProps {
  word: Word;
}

export const WordCard: FC<WordCardProps> = ({ word }) => {
  const { name, translation, image } = word;
  const gameMode = useAppSelector(selectGameMode);
  const classes = classnames(styles.card__frontInfo, {
    [styles.card__frontInfo_hidden]: gameMode === GAME_MODE.PLAY,
  });

  const imageStyle = {
    backgroundImage: `url(${image.url})`,
  };

  return (
    <div className={styles.card}>
      <div className={styles.card__front}>
        <div className={styles.card__frontImg} style={imageStyle} />
        <div className={classes}>
          <span className={styles.card__btnAudio} />
          <p>{name}</p>
          <span className={styles.card__btnFlip} />
        </div>
      </div>
      <div className={styles.card__back}>
        <div className={styles.card__backImg} style={imageStyle} />
        <div className={styles.card__backInfo}>
          <p>{translation}</p>
        </div>
      </div>
    </div>
  );
};
