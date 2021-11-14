import { FC } from 'react';
import { CardsContainer, CategoryCard } from '../components';
import { Category } from '../interfaces';
import { storeWrapper } from '../redux/store';
import { getAllCategories } from '../redux/thunks';
import styles from '../styles/Wrapper.module.scss';

interface MainPros {
  categories: Category[];
}
const Main: FC<MainPros> = ({ categories }) => {
  if (!categories) {
    return <div className={styles.wrapper}>Loading...</div>;
  }
  return (
    <div className={styles.wrapper}>
      <CardsContainer>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </CardsContainer>
    </div>
  );
};

export default Main;

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async () => {
  const { payload } = await store.dispatch(getAllCategories());

  return { props: { categories: payload } };
});
