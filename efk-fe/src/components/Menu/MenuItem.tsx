import { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';
import styles from './Menu.module.scss';

interface MenuItemProps {
  isActive: boolean;
  name: string;
  iconPath: string;
  routePath: string;
}
export const MenuItem: FC<MenuItemProps> = ({ isActive, name, iconPath, routePath }) => {
  const classes = classnames(styles.list__item, {
    [styles.list__item_active]: isActive,
  });

  return (
    <li className={classes}>
      <span className={styles.list__itemImg} style={{ backgroundImage: `url(${iconPath})` }} />
      <Link href={routePath}>
        <a className={styles.list__itemLink}>{name}</a>
      </Link>
    </li>
  );
};
