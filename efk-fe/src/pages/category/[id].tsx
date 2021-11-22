import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCategoryWithWords } from '../../redux/thunks';
import { getSelectedCategory } from '../../redux/selectors';
import { DefaultContent, WordsContainer } from '../../components';
import { isString } from '../../utils';
import { PAGE } from '../../constants';
import styles from '../../styles/Wrapper.module.scss';

const Category: FC = () => {
  const { query } = useRouter();
  const { id: categoryId } = query;
  const { isLoading, name, words } = useAppSelector(getSelectedCategory);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isString(categoryId)) {
      dispatch(getCategoryWithWords(categoryId));
    }
  }, [categoryId, dispatch]);

  if (isLoading) {
    return <CircularProgress size={70} />;
  }

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

export default Category;
