import { FC } from 'react';
import { CategoryCard } from './CategoryCard';
import { Category } from '../../interfaces';
import styles from './CategoriesContainer.module.scss';

interface CategoriesContainerProps {
  categories: Category[];
}
export const CategoriesContainer: FC<CategoriesContainerProps> = ({ categories }) => {
  return (
    <section className={styles.categoryList}>
      {categories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </section>
  );
};
