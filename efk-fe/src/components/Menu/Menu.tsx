/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import ClickAwayListener from '@mui/core/ClickAwayListener';
import { useAppDispatch, useAppSelector, useOpenItem } from '../../hooks';
import { getAllCategories } from '../../redux/thunks';
import { selectCategories } from '../../redux/selectors';
import { MenuItem } from './MenuItem';
import { ICON_PATH } from '../../constants';
import styles from './Menu.module.scss';

export const Menu: FC = () => {
  const [isOpened, toggleMenu, closeMenu] = useOpenItem();
  const { asPath } = useRouter();
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <ClickAwayListener onClickAway={closeMenu}>
      <nav className={styles.menu}>
        <input className={styles.menu__checkbox} type="checkbox" checked={isOpened} onChange={toggleMenu} />
        <span className={styles.menu__line} />
        <span className={styles.menu__line} />
        <span className={styles.menu__line} />
        <ul className={styles.list} role="menu">
          <MenuItem
            isActive={asPath === '/'}
            name="main"
            iconPath={ICON_PATH.MAIN}
            routePath="/"
            onCloseMenu={closeMenu}
          />
          <MenuItem
            isActive={asPath.includes('admin')}
            name="admin"
            iconPath={ICON_PATH.ADMIN}
            routePath="/admin"
            onCloseMenu={closeMenu}
          />
          <MenuItem
            isActive={asPath.includes('statistics')}
            name="statistics"
            iconPath={ICON_PATH.STATISTICS}
            routePath="/statistics"
            onCloseMenu={closeMenu}
          />
          {categories.map(({ id, name, icon }) => {
            const path = `/category/${id}`;
            return (
              <MenuItem
                key={id}
                isActive={asPath === path}
                name={name}
                iconPath={icon.url}
                routePath={path}
                onCloseMenu={closeMenu}
              />
            );
          })}
        </ul>
      </nav>
    </ClickAwayListener>
  );
};
