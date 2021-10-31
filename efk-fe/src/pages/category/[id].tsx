import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { WordsContainer } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { selectWords } from '../../redux/selectors';
import { getCategoryWithWords } from '../../redux/thunks';
import { isString } from '../../utils';
import styles from './Category.module.scss';

const Category: FC = () => {
  const { query } = useRouter();
  const { id: categoryId } = query;
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isString(categoryId)) {
      dispatch(getCategoryWithWords(categoryId));
    }
  }, [categoryId, dispatch]);

  return (
    <section className={styles.category}>
      <WordsContainer words={words} />
    </section>
  );
};

export default Category;
