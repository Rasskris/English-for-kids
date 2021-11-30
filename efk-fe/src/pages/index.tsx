import { FC } from 'react';
import { CircularProgress } from '@mui/material';
import { Category } from '../interfaces';
import { storeWrapper } from '../redux/store';
import { getAllCategories } from '../redux/thunks';
import { CardsContainer, CategoryCard, DefaultContent } from '../components';
import { PAGE } from '../constants';
import styles from '../styles/Wrapper.module.scss';

interface MainProps {
  categories: Category[];
  notFound: boolean;
}
const MainPage: FC<MainProps> = ({ categories, notFound }) => {
  if (!categories) {
    return <CircularProgress />;
  }

  return (
    <div className={styles.wrapper}>
      {notFound ? (
        <DefaultContent pageName={PAGE.MAIN} />
      ) : (
        <CardsContainer>
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </CardsContainer>
      )}
    </div>
  );
};

export default MainPage;

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async () => {
  try {
    const { payload } = await store.dispatch(getAllCategories());

    return { props: { categories: payload, notFound: false } };
  } catch (error) {
    return { props: { categories: [], notFound: true } };
  }
});
