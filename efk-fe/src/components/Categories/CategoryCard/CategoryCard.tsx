import { FC, memo } from 'react';
import Link from 'next/link';
import { Category } from '../../../interfaces';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: FC<CategoryCardProps> = memo(({ category }) => {
  const { id, name, coverImage } = category;

  return (
    <figure className={styles.categoryCard} data-category-name={name} role="figure">
      <div className={styles.categoryCard__img} style={{ backgroundImage: `url(${coverImage.url})` }} />
      <figcaption className={styles.categoryCard__name}>{name}</figcaption>
      <Link href={`/category/${id}/`}>
        <a className={styles.categoryCard__link} />
      </Link>
    </figure>
  );
});

CategoryCard.displayName = 'CategoryCard';
