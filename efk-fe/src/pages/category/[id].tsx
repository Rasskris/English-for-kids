import { useEffect } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import useSWRImmutable from 'swr/immutable';
import { clientAPI } from '../../lib';
import { Category } from '../../interfaces';
import { DefaultContent, Skeleton, WordsContainer } from '../../components';
import { useAppDispatch } from '../../hooks';
import { ENDPOINT, PAGE } from '../../enums';
import { resetGameState } from '../../redux/slices';
import styles from '../../styles/Wrapper.module.scss';

interface CategoryPageProps {
  categoryId: string;
}

const fetcher = (categoryId: string) => clientAPI.get(`${ENDPOINT.CATEGORIES}/${categoryId}`);

const CategoryPage: NextPage<CategoryPageProps> = ({ categoryId }) => {
  const { data: category } = useSWRImmutable(categoryId, fetcher);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetGameState());
  }, [categoryId]);

  if (!category) {
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
  const categoryId = params.id;

  return {
    props: { categoryId },
  };
};

export default CategoryPage;
