import { FC } from 'react';
import { GetServerSideProps } from 'next';
import { clientAPI } from '../lib';
import { useToast } from '../hooks';
import { Category } from '../interfaces';
import { CardsContainer, CategoryCard, DefaultContent } from '../components';
import { ENDPOINT, PAGE } from '../constants';
import styles from '../styles/Wrapper.module.scss';

interface MainProps {
  categories?: Category[];
  notFound?: boolean;
}
const MainPage: FC<MainProps> = ({ categories, notFound }) => {
  useToast();

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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const categories = await clientAPI.get(ENDPOINT.CATEGORIES);

    if (!categories) {
      return {
        notFound: true,
      };
    }

    return { props: { categories } };
  } catch (error) {
    return { notFound: true };
  }
};
