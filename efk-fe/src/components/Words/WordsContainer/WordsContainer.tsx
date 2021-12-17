import { FC, useEffect, useState, memo } from 'react';
import classnames from 'classnames';
import { Word } from '../../../interfaces';
import { WordCard } from '../WordCard/WordCard';
import { FinishedGameContent, GameButtonsContainer, RatingLine, Modal } from '../..';
import { gameService } from '../../../services';
import { resetGameState, startGame } from '../../../redux/slices';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectGame } from '../../../redux/selectors';
import { isGameFinished, isGameModePlay, isGameStarted } from '../../../utils';
import styles from './WordsContainer.module.scss';

interface WordsContainerProps {
  categoryName: string;
  words: Word[];
}

export const WordsContainer: FC<WordsContainerProps> = memo(({ categoryName, words }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mode: gameMode, userAnswers, status: gameStatus } = useAppSelector(selectGame);
  const dispatch = useAppDispatch();
  const wordsStyles = classnames(styles.words, {
    [styles.words_blocked]: isGameModePlay(gameMode) && !isGameStarted(gameStatus),
  });

  useEffect(() => {
    if (isGameFinished(gameStatus)) {
      setIsModalVisible(true);
    }
  }, [gameStatus]);

  const handleClickBtnStart = () => {
    dispatch(startGame());
    gameService.startGame(words, dispatch);
  };

  const handleClickBtnRepeat = () => {
    gameService.repeatWordAudio();
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    dispatch(resetGameState());
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{categoryName}</h3>
      {isGameModePlay(gameMode) && (
        <GameButtonsContainer onClickBtnStart={handleClickBtnStart} onClickBtnRepeat={handleClickBtnRepeat} />
      )}
      {isGameStarted(gameStatus) && <RatingLine userAnswers={userAnswers} />}
      <div className={wordsStyles}>
        {words.map((word) => (
          <WordCard key={word.id} categoryName={categoryName} word={word} gameMode={gameMode} />
        ))}
      </div>
      {isModalVisible && (
        <Modal isVisible={isModalVisible}>
          <FinishedGameContent onCloseModal={handleCloseModal} />
        </Modal>
      )}
    </div>
  );
});
