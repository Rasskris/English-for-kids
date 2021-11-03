/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useEffect, useState } from 'react';
import classnames from 'classnames';
import { Word } from '../../interfaces';
import { useAppSelector } from '../../hooks';
import { selectGameMode } from '../../redux/selectors';
import { ANSWER } from '../../constants';
import { ClickBtnAudioHandler, ClickWordCardHandler } from '../../types';
import { isGameModePlay, isGameModeTrain } from '../../utils';
import styles from './wordCard.module.scss';

interface WordCardProps {
  word: Word;
  onClickBtnAudio: ClickBtnAudioHandler;
  onClickWordCard: ClickWordCardHandler;
}

export const WordCard: FC<WordCardProps> = ({ word, onClickBtnAudio, onClickWordCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const gameMode = useAppSelector(selectGameMode);
  const { name, translation, image, audio } = word;

  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
    [styles.notActive]: !isActive,
  });
  const frontInfoStyle = classnames(styles.card__frontInfo, {
    [styles.card__frontInfo_hidden]: isGameModePlay(gameMode),
  });
  const imageStyle = {
    backgroundImage: `url(${image.url})`,
  };

  useEffect(() => {
    if (isGameModeTrain(gameMode)) {
      setIsActive(true);
    }
  }, [gameMode]);

  const handleMouseLeave = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
  };

  const handleClickBtnFlip = () => {
    setIsFlipped(true);
  };

  const handleClickCard = () => {
    const answer = onClickWordCard(word);
    if (answer === ANSWER.RIGHT) {
      setIsActive(false);
    }
  };

  return (
    <div
      className={cardStyle}
      onMouseLeave={handleMouseLeave}
      onClick={isGameModePlay(gameMode) ? handleClickCard : undefined}
    >
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
