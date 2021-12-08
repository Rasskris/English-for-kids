/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { FC, useEffect, useState, memo } from 'react';
import Image from 'next/image';
import classnames from 'classnames';
import { Word } from '../../../interfaces';
import { useFlipItem } from '../../../hooks';
import { statisticsDB } from '../../../lib';
import { gameService } from '../../../services';
import { isGameModePlay, isGameModeTrain, playAudio } from '../../../utils';
import { ANSWER, GAME_MODE } from '../../../constants';
import styles from './WordCard.module.scss';

interface WordCardProps {
  word: Word;
  categoryName: string;
  gameMode: GAME_MODE;
}

export const WordCard: FC<WordCardProps> = memo(({ word, categoryName, gameMode }) => {
  const [isFlipped, flipCard, unFlipCard] = useFlipItem();
  const [isActive, setIsActive] = useState(true);
  const { id: wordId, name, translation, image, audio } = word;
  const statisticsData = { ...word, category: categoryName };

  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
    [styles.notActive]: !isActive,
  });
  const frontInfoStyle = classnames(styles.card__frontInfo, {
    [styles.card__frontInfo_hidden]: isGameModePlay(gameMode),
  });

  useEffect(() => {
    if (isGameModeTrain(gameMode)) {
      setIsActive(true);
    }
  }, [gameMode]);

  const handleClickCard = () => {
    const answer = gameService.handleSelectedWord(wordId, categoryName);
    if (answer === ANSWER.RIGHT) {
      setIsActive(false);
    }
  };

  const handleClickBtnAudio = () => {
    playAudio(audio.url);
    statisticsDB.incrementTrained(statisticsData);
  };

  return (
    <div
      className={cardStyle}
      onMouseLeave={unFlipCard}
      onClick={isGameModePlay(gameMode) ? handleClickCard : undefined}
    >
      <div className={styles.card__front}>
        <Image
          className={styles.card__frontImg}
          width={250}
          height={250}
          quality={100}
          placeholder="blur"
          blurDataURL={image.url}
          alt={name}
          src={image.url}
        />
        <div className={frontInfoStyle}>
          <button
            type="button"
            aria-label="play"
            className={styles.card__btnAudio}
            onClick={handleClickBtnAudio}
          />
          <p>{name}</p>
          <button type="button" aria-label="flip" className={styles.card__btnFlip} onClick={flipCard} />
        </div>
      </div>
      <div className={styles.card__back}>
        <Image className={styles.card__backImg} width={250} height={250} quality={100} src={image.url} />
        <div className={styles.card__backInfo}>
          <p>{translation}</p>
        </div>
      </div>
    </div>
  );
});
