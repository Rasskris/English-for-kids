import { FC } from 'react';
import classnames from 'classnames';
import { Word } from '../../../interfaces';
import { ClickWordCardHandler } from '../../../types';
import { playAudio } from '../../../utils';
import { WordCard } from '../WordCard/WordCard';
import styles from './WordsContainer.module.scss';

interface WordsContainerProps {
  words: Word[];
  isGameStarted: boolean;
  isGameModePlay: boolean;
  onClickWordCard: ClickWordCardHandler;
}

export const WordsContainer: FC<WordsContainerProps> = ({
  words,
  isGameStarted,
  isGameModePlay,
  onClickWordCard,
}) => {
  const containerStyles = classnames(styles.cardsContainer, {
    [styles.cardsContainer_blocked]: isGameModePlay && !isGameStarted,
  });

  const handleClickBtnAudio = (audioSrc: string) => () => {
    playAudio(audioSrc);
  };

  return (
    <div className={containerStyles}>
      {words.map((word) => (
        <WordCard
          key={word.id}
          word={word}
          onClickBtnAudio={handleClickBtnAudio}
          onClickWordCard={onClickWordCard}
        />
      ))}
    </div>
  );
};
