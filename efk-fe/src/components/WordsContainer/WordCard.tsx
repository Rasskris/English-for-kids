import { FC, useState } from 'react';
import classnames from 'classnames';
import { Word } from '../../interfaces';
import { useAppSelector } from '../../hooks';
import { selectGameMode } from '../../redux/selectors';
import { GAME_MODE } from '../../constants';
import styles from './wordCard.module.scss';

interface WordCardProps {
  word: Word;
  onClickBtnAudio: (audioSrc: string) => () => void;
}

export const WordCard: FC<WordCardProps> = ({ word, onClickBtnAudio }) => {
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const { name, translation, image, audio } = word;
  const gameMode = useAppSelector(selectGameMode);

  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isCardFlipped,
  });
  const frontInfoStyle = classnames(styles.card__frontInfo, {
    [styles.card__frontInfo_hidden]: gameMode === GAME_MODE.PLAY,
  });
  const imageStyle = {
    backgroundImage: `url(${image.url})`,
  };

  const handleMouseLeave = () => {
    if (isCardFlipped) {
      setIsCardFlipped(false);
    }
  };

  const handleClickBtnFlip = () => {
    setIsCardFlipped(true);
  };

  return (
    <div className={cardStyle} onMouseLeave={handleMouseLeave}>
      <div className={styles.card__front}>
        <div className={styles.card__frontImg} style={imageStyle} />
        <div className={frontInfoStyle}>
          <button type="button" className={styles.card__btnAudio} onClick={onClickBtnAudio(audio.url)} />
          <p>{name}</p>
          <button type="button" className={styles.card__btnFlip} onClick={handleClickBtnFlip} />
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
