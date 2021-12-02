import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks';
import { selectCategories, selectLoadingStatus } from '../../redux/selectors';
import { CardsContainer, CategoryEditCard, CategoryAddCard, Skeleton } from '../../components';
import { isRoleAdmin } from '../../utils';
import styles from '../../styles/Wrapper.module.scss';

const AdminPage: FC = () => {
  const router = useRouter();
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectLoadingStatus('categories'));
  const { isAuth, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!(isAuth && isRoleAdmin(user.role))) {
      router.push('/auth/signin');
    }
  }, [isAuth]);

  if (isLoading || !isAuth) {
    return <Skeleton />;
  }

  return (
    <section className={styles.wrapper}>
      <CardsContainer>
        {categories.map((category) => (
          <CategoryEditCard key={category.id} category={category} />
        ))}
        <CategoryAddCard />
      </CardsContainer>
    </section>
  );
};

export default AdminPage;
