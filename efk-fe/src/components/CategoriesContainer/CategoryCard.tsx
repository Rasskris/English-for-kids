/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-has-content */
import { FC } from 'react';
import Link from 'next/link';
import { Category } from '../../interfaces';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: FC<CategoryCardProps> = ({ category }) => {
  const { id, name, coverImage } = category;
  return (
    <figure className={styles.categoryCard} data-category-name={name}>
      <div className={styles.categoryCard__img} style={{ backgroundImage: `url(${coverImage.url})` }} />
      <figcaption className={styles.categoryCard__name}>{name}</figcaption>
      <Link href={`/category/${id}/`} as={`/category/${name}`} passHref>
        <a className={styles.categoryCard__link} />
      </Link>
    </figure>
  );
};
