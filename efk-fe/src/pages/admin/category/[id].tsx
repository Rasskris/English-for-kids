import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectWords } from '../../../redux/selectors';
import { getCategoryWithWords } from '../../../redux/thunks';
import { CardsContainer, WordAddCard, WordEditCard } from '../../../components';
import { isString } from '../../../utils';
import styles from '../../../styles/Wrapper.module.scss';

const Category: FC = () => {
  const { query } = useRouter();
  const words = useAppSelector(selectWords);
  const dispatch = useAppDispatch();
  const { id: categoryId } = query;

  useEffect(() => {
    if (isString(categoryId)) {
      dispatch(getCategoryWithWords(categoryId));
    }
  }, [categoryId, dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Link href="/admin">
          <a className={styles.link}>back to edit categories</a>
        </Link>
      </div>
      <CardsContainer>
        <>
          {words.map((word) => (
            <WordEditCard key={word.id} word={word} />
          ))}
          <WordAddCard categoryId={categoryId as string} />
        </>
      </CardsContainer>
    </div>
  );
};

export default Category;
