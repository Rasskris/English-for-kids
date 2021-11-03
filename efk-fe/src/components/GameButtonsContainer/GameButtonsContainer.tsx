import { FC } from 'react';
import classnames from 'classnames';
import { useAppSelector } from '../../hooks';
import { selectGameStatus } from '../../redux/selectors';
import { isGameStarted } from '../../utils';
import styles from './GameButtonsContainer.module.scss';

interface GameButtonsProps {
  onClickBtnStart: () => void;
  onClickBtnRepeat: () => void;
}

export const GameButtonsContainer: FC<GameButtonsProps> = ({ onClickBtnStart, onClickBtnRepeat }) => {
  const gameStatus = useAppSelector(selectGameStatus);
  const btnStartStyles = classnames(styles.btn_start, {
    [styles.hidden]: isGameStarted(gameStatus),
  });
  const btnRepeatStyles = classnames(styles.btn_repeat, {
    [styles.hidden]: !isGameStarted(gameStatus),
  });

  return (
    <div className={styles.btnContainer}>
      <button type="button" className={btnStartStyles} onClick={onClickBtnStart} />
      <button type="button" className={btnRepeatStyles} onClick={onClickBtnRepeat} />
    </div>
  );
};
