import { FC, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '../../../interfaces';
import styles from './CategoryCard.module.scss';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: FC<CategoryCardProps> = memo(({ category }) => {
  const { id, name, coverImage } = category;

  return (
    <figure className={styles.card} data-category-name={name} role="figure">
      <Image className={styles.card__img} width={250} height={250} src={coverImage.url} quality={100} />
      <figcaption className={styles.card__name}>{name}</figcaption>
      <Link href={`/category/${id}/`}>
        <a className={styles.card__link} />
      </Link>
    </figure>
  );
});

CategoryCard.displayName = 'CategoryCard';
