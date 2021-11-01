import { FC } from 'react';
import { Word } from '../../interfaces';
import { playAudio } from '../../utils';
import { WordCard } from './WordCard';
import styles from './WordsContainer.module.scss';

interface WordsContainerProps {
  words: Word[];
}

export const WordsContainer: FC<WordsContainerProps> = ({ words }) => {
  const handleClickBtnAudio = (audioSrc: string) => () => {
    playAudio(audioSrc);
  };

  return (
    <div className={styles.cardsContainer}>
      {words.map((word) => (
        <WordCard key={word.id} word={word} onClickBtnAudio={handleClickBtnAudio} />
      ))}
    </div>
  );
};
