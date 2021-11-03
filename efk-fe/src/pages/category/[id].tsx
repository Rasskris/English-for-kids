import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectGame, selectWords } from '../../redux/selectors';
import { startGame } from '../../redux/slices';
import { getCategoryWithWords } from '../../redux/thunks';
import {
  GameButtonsContainer,
  WordsContainer,
  RatingLine,
  Modal,
  FinishedGameContent,
} from '../../components';
import { isGameFinished, isGameModePlay, isGameStarted, isString } from '../../utils';
import { gameService } from '../../services';
import { Word } from '../../interfaces';
import styles from './Category.module.scss';
import { resetGameState } from '../../redux/slices/gameSlice';

const Category: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { query } = useRouter();
  const { id: categoryId } = query;
  const { mode: gameMode, userAnswers, status: gameStatus } = useAppSelector(selectGame);
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isString(categoryId)) {
      dispatch(getCategoryWithWords(categoryId));
    }
  }, [categoryId, dispatch]);

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

  // TODO fix handleClickWordCard
  const handleClickWordCard = (word: Word) => {
    return gameService.handleSelectedWord(word);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    dispatch(resetGameState());
  };

  return (
    <section className={styles.category}>
      {isGameModePlay(gameMode) && (
        <GameButtonsContainer onClickBtnStart={handleClickBtnStart} onClickBtnRepeat={handleClickBtnRepeat} />
      )}
      {isGameStarted(gameStatus) && <RatingLine userAnswers={userAnswers} />}
      <WordsContainer
        isGameStarted={isGameStarted(gameStatus)}
        isGameModePlay={isGameModePlay(gameMode)}
        onClickWordCard={handleClickWordCard}
        words={words}
      />
      {isModalVisible && (
        <Modal isVisible={isModalVisible}>
          <FinishedGameContent onCloseModal={handleCloseModal} />
        </Modal>
      )}
    </section>
  );
};

export default Category;
