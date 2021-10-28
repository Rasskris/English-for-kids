import { FC } from 'react';
import { CategoriesContainer } from '../components';
import { Category } from '../interfaces';
import { storeWrapper } from '../redux/store';
import { getAllCategories } from '../redux/thunks';
import styles from '../styles/Home.module.scss';

interface MainPros {
  categories: Category[];
}
const Main: FC<MainPros> = ({ categories }) => {
  if (!categories) {
    return <div className={styles.container}>Loading...</div>;
  }
  return (
    <div className={styles.container}>
      <CategoriesContainer categories={categories} />
    </div>
  );
};

export default Main;

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async () => {
  const { payload } = await store.dispatch(getAllCategories());

  return { props: { categories: payload } };
});
