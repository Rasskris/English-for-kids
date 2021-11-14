import { FC } from 'react';
import { useAppSelector } from '../../hooks';
import { selectCategories } from '../../redux/selectors';
import { CardsContainer, CategoryEditCard, CategoryAddCard } from '../../components';

const AdminPage: FC = () => {
  const categories = useAppSelector(selectCategories);

  return (
    <CardsContainer>
      <>
        {categories.map((category) => (
          <CategoryEditCard key={category.id} category={category} />
        ))}
        <CategoryAddCard />
      </>
    </CardsContainer>
  );
};

export default AdminPage;
