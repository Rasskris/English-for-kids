import { FC } from 'react';
import { Category } from '../interfaces';
import { storeWrapper } from '../redux/store';
import { getAllCategories } from '../redux/thunks';
import { CardsContainer, CategoryCard, DefaultContent } from '../components';
import { PAGE } from '../constants';
import styles from '../styles/Wrapper.module.scss';

interface MainProps {
  categories?: Category[];
  notFound?: boolean;
}
const MainPage: FC<MainProps> = ({ categories, notFound }) => {
  if (notFound) {
    return <DefaultContent pageName={PAGE.MAIN} />;
  }

  return (
    <section className={styles.wrapper}>
      <CardsContainer>
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </CardsContainer>
    </section>
  );
};

export default MainPage;

export const getServerSideProps = storeWrapper.getServerSideProps((store) => async () => {
  try {
    const { payload } = await store.dispatch(getAllCategories());

    if (!payload) {
      return {
        notFound: true,
      };
    }

    return { props: { categories: payload } };
  } catch (error) {
    return { notFound: true };
  }
});
