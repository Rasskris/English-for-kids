import { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector, useRedirectNotAdmin } from '../../hooks';
import { selectCategories, selectLoadingStatus } from '../../redux/selectors';
import { CardsContainer, CategoryEditCard, CategoryAddCard } from '../../components';
import styles from '../../styles/Wrapper.module.scss';

const AdminPage: FC = () => {
  const categories = useAppSelector(selectCategories);
  const isLoading = useAppSelector(selectLoadingStatus('categories'));
  const { user } = useRedirectNotAdmin();

  if (isLoading || !user) {
    return <CircularProgress size={70} />;
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
