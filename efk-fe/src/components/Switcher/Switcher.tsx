import { FC, useState } from 'react';
import classnames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectGameMode } from '../../redux/selectors';
import { switchGameMode } from '../../redux/slices/gameSlice';
import { isGameModePlay, isGameModeTrain } from '../../utils';
import styles from './Switcher.module.scss';

export const Switcher: FC = () => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const gameMode = useAppSelector(selectGameMode);
  const dispatch = useAppDispatch();

  const switherModeStyle = classnames(styles.switcher__mode, {
    [styles.switcher__mode_train]: isGameModeTrain(gameMode),
    [styles.switcher__mode_play]: isGameModePlay(gameMode),
  });

  const handleChange = () => {
    setCheckboxValue((prevState) => !prevState);
    dispatch(switchGameMode());
  };

  return (
    <div className={styles.switcher}>
      <input className={styles.checkbox} type="checkbox" checked={checkboxValue} onChange={handleChange} />
      <div className={styles.switcher__item}>
        <div className={styles.dog}>
          <div className={styles.dog__ear} />
          <div className={styles.dog__ear_right} />
          <div className={styles.dog__face}>
            <div className={styles.dog__eyes} />
            <div className={styles.dog__mouth} />
          </div>
        </div>
        <p className={switherModeStyle}>{gameMode}</p>
      </div>
    </div>
  );
};
