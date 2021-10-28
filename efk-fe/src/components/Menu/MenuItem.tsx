import { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import styles from './Menu.module.scss';

interface MenuItemProps {
  isActive: boolean;
  name: string;
  iconPath: string;
  routePath: string;
  shownPath: string;
}
export const MenuItem: FC<MenuItemProps> = ({ isActive, name, iconPath, routePath, shownPath }) => {
  const classes = classnames(styles.list__item, {
    [styles.list__item_active]: isActive,
  });

  return (
    <li className={classes}>
      <span className={styles.list__itemImg} style={{ backgroundImage: `url(${iconPath})` }} />
      <Link href={routePath} as={shownPath} passHref>
        <a className={styles.list__itemLink} role="menuitem" tabIndex={0}>
          {name}
        </a>
      </Link>
    </li>
  );
};
