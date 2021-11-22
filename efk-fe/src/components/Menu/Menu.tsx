/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ClickAwayListener from '@mui/core/ClickAwayListener';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCategories } from '../../redux/thunks';
import { selectCategories } from '../../redux/selectors';
import { MenuItem } from './MenuItem';
import { ICON_PATH } from '../../constants';
import styles from './Menu.module.scss';

export const Menu: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { asPath } = useRouter();
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  const handleChange = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <ClickAwayListener onClickAway={handleCloseMenu}>
      <nav className={styles.menu}>
        <input className={styles.menu__checkbox} type="checkbox" checked={isOpen} onChange={handleChange} />
        <span className={styles.menu__line} />
        <span className={styles.menu__line} />
        <span className={styles.menu__line} />
        <ul className={styles.list}>
          <MenuItem
            isActive={asPath === '/'}
            name="main"
            iconPath={ICON_PATH.MAIN}
            routePath="/"
            onCloseMenu={handleCloseMenu}
          />
          <MenuItem
            isActive={asPath.includes('admin')}
            name="admin"
            iconPath={ICON_PATH.ADMIN}
            routePath="/admin"
            onCloseMenu={handleCloseMenu}
          />
          <MenuItem
            isActive={asPath.includes('statistics')}
            name="statistics"
            iconPath={ICON_PATH.STATISTICS}
            routePath="/statistics"
            onCloseMenu={handleCloseMenu}
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
                onCloseMenu={handleCloseMenu}
              />
            );
          })}
        </ul>
      </nav>
    </ClickAwayListener>
  );
};
