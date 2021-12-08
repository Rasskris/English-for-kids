import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import { clientAPI } from '../../lib';
import { Category, CategoryWithWords } from '../../interfaces';
import { DefaultContent, Skeleton, WordsContainer } from '../../components';
import { useAppDispatch } from '../../hooks';
import { ENDPOINT, PAGE } from '../../enums';
import { resetGameState } from '../../redux/slices';
import styles from '../../styles/Wrapper.module.scss';

interface CategoryPageProps {
  category: CategoryWithWords;
}

const CategoryPage: NextPage<CategoryPageProps> = ({ category }) => {
  const dispatch = useAppDispatch();
  const { isFallback } = useRouter();

  useEffect(() => {
    dispatch(resetGameState());
  }, [category]);

  if (isFallback) {
    return <Skeleton />;
  }

  const { name, words } = category;

  return (
    <section className={styles.wrapper}>
      {words.length > 0 ? (
        <WordsContainer categoryName={name} words={words} />
      ) : (
        <DefaultContent pageName={PAGE.CATEGORY} />
      )}
    </section>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const categories: Category[] = await clientAPI.get(ENDPOINT.CATEGORIES);
  const paths = categories.map((category) => ({
    params: { id: String(category.id) },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category: CategoryWithWords = await clientAPI.get(`${ENDPOINT.CATEGORIES}/${params.id}`);

  return {
    props: { category },
  };
};

export default CategoryPage;
