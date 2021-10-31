import { FC } from 'react';
import { Word } from '../../interfaces';
import { WordCard } from './WordCard';
import styles from './WordsContainer.module.scss';

interface WordsContainerProps {
  words: Word[];
}

export const WordsContainer: FC<WordsContainerProps> = ({ words }) => {
  return (
    <div className={styles.cardsContainer}>
      {words.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
    </div>
  );
};
