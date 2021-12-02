import { FC, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { selectLoadingStatus, selectWords } from '../../../redux/selectors';
import { getCategoryWithWords } from '../../../redux/thunks';
import { CardsContainer, WordAddCard, WordEditCard, Skeleton } from '../../../components';
import { isString, isRoleAdmin } from '../../../utils';
import styles from '../../../styles/Wrapper.module.scss';

const AdminCategoryPage: FC = () => {
  const router = useRouter();
  const words = useAppSelector(selectWords);
  const isLoading = useAppSelector(selectLoadingStatus('words'));
  const { isAuth, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { id: categoryId } = router.query;

  useEffect(() => {
    if (!(isAuth && isRoleAdmin(user.role))) {
      router.push('/auth/signin');
    } else if (isString(categoryId)) {
      dispatch(getCategoryWithWords(categoryId));
    }
  }, [isAuth, categoryId]);

  if (isLoading || !isAuth) {
    return <Skeleton />;
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
