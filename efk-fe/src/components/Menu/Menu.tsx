import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAllCategories } from '../../redux/thunks';
import { selectCategories } from '../../redux/selectors';
import { MenuItem } from './MenuItem';
import { MAIN_ICON_PATH } from '../../constants';
import styles from './Menu.module.scss';

export const Menu: FC = () => {
  const { asPath } = useRouter();
  const categories = useAppSelector(selectCategories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, categories]);

  return (
    <nav className={styles.menu}>
      <input className={styles.menu__checkbox} type="checkbox" />
      <span className={styles.menu__line} />
      <span className={styles.menu__line} />
      <span className={styles.menu__line} />
      <ul className={styles.list}>
        <MenuItem
          isActive={asPath === '/main'}
          name="main"
          iconPath={MAIN_ICON_PATH}
          routePath="/"
          shownPath="/main"
        />
        {categories.map(({ id, name, icon }) => (
          <MenuItem
            key={id}
            isActive={asPath === `/category/${name}`}
            name={name}
            iconPath={icon.url}
            routePath={`/category/${id}`}
            shownPath={`/category/${name}`}
          />
        ))}
      </ul>
    </nav>
  );
};
