import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppDispatch, useAppSelector, useRedirectNotAdmin } from '../../../hooks';
import { selectLoadingStatus, selectWords } from '../../../redux/selectors';
import { getCategoryWithWords } from '../../../redux/thunks';
import { CardsContainer, WordAddCard, WordEditCard } from '../../../components';
import { isString } from '../../../utils';
import styles from '../../../styles/Wrapper.module.scss';

const AdminCategoryPage: FC = () => {
  const router = useRouter();
  const words = useAppSelector(selectWords);
  const isLoading = useAppSelector(selectLoadingStatus('words'));
  const { id: categoryId } = router.query;
  const dispatch = useAppDispatch();
  const { user } = useRedirectNotAdmin();

  useEffect(() => {
    if (isString(categoryId)) {
      dispatch(getCategoryWithWords(categoryId));
    }
  }, [categoryId, dispatch]);

  if (isLoading || !user) {
    return <CircularProgress size={70} />;
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.info}>
        <Link href="/admin">
          <a className={styles.link}>back to edit categories</a>
        </Link>
      </div>
      <CardsContainer>
        {words.map((word) => (
          <WordEditCard key={word.id} word={word} />
        ))}
        <WordAddCard categoryId={categoryId as string} />
      </CardsContainer>
    </section>
  );
};

export default AdminCategoryPage;
