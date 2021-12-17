import { FC, KeyboardEvent } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import styles from './Menu.module.scss';

interface MenuItemProps {
  isActive: boolean;
  name: string;
  iconPath: string;
  routePath: string;
  onCloseMenu: VoidFunction;
}
export const MenuItem: FC<MenuItemProps> = ({ isActive, name, iconPath, routePath, onCloseMenu }) => {
  const classes = classnames(styles.list__item, {
    [styles.list__item_active]: isActive,
  });

  const handleClick = () => {
    onCloseMenu();
  };

  const handleEnterPress = ({ key }: KeyboardEvent<HTMLAnchorElement>) => {
    if (key === 'Enter') {
      onCloseMenu();
    }
  };

  return (
    <li className={classes}>
      <span className={styles.list__itemImg} style={{ backgroundImage: `url(${iconPath})` }} />
      <Link href={routePath}>
        <a
          className={styles.list__itemLink}
          onClick={handleClick}
          role="menuitem"
          tabIndex={0}
          onKeyPress={handleEnterPress}
        >
          {name}
        </a>
      </Link>
    </li>
  );
};
