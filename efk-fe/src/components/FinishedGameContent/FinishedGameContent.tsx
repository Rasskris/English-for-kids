import { FC } from 'react';
import classnames from 'classnames';
import { useAppSelector } from '../../hooks';
import { selectCountMistakes } from '../../redux/selectors';
import { getCongratulatoryMessage, getFailedMessage, checkIsGameFailed } from '../../utils';
import styles from './FinishedGameContent.module.scss';

interface Props {
  onCloseModal: VoidFunction;
}

export const FinishedGameContent: FC<Props> = ({ onCloseModal }) => {
  const countMistakes = useAppSelector(selectCountMistakes);
  const isGameFailed = checkIsGameFailed(countMistakes);
  const message = isGameFailed ? getFailedMessage(countMistakes) : getCongratulatoryMessage();

  const imageStyles = classnames(styles.finishedGame__image, {
    [styles.finishedGame__image_fail]: isGameFailed,
    [styles.finishedGame__image_win]: !isGameFailed,
  });

  return (
    <div className={styles.finishedGame}>
      <p className={styles.finishedGame__message}>{message}</p>
      <div className={imageStyles} />
      <button type="button" className={styles.btn} onClick={onCloseModal}>
        OK
      </button>
    </div>
  );
};
