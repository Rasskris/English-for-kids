/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import Link from 'next/link';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Category, CategoryInputs } from '../../../../interfaces';
import { useDispatchWithReturn, useFlipItem } from '../../../../hooks';
import { updateCategory } from '../../../../redux/thunks';
import { TOAST_OPTIONS, TOAST_TEXT } from '../../../../constants';
import { formingDataToSubmit } from '../../../../utils';
import { CategoryForm } from '../CategoryForm';
import styles from './CategoryEditCard.module.scss';

interface CategoryCardProps {
  category: Category;
}

export const CategoryEditCard: FC<CategoryCardProps> = ({ category }) => {
  const [isFlipped, flipCard, unFlipCard] = useFlipItem();
  const [progress, setProgress] = useState(false);
  const [dispatch] = useDispatchWithReturn();
  const { id: categoryId, name, coverImage, icon } = category;
  const methods = useForm<CategoryInputs>();

  const { handleSubmit } = methods;
  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
  });

  const onSubmit: SubmitHandler<CategoryInputs> = async (data) => {
    try {
      setProgress(true);
      const categoryData = formingDataToSubmit(data);

      await dispatch(updateCategory({ categoryId, categoryData }));

      toast.success(TOAST_TEXT.CATEGORY_UPDATED, TOAST_OPTIONS);
      unFlipCard();
      setProgress(false);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
      setProgress(false);
    }
  };

  return (
    <div className={cardStyle}>
      <div className={styles.card__front}>
        <div className={styles.card__frontImg} style={{ backgroundImage: `url(${coverImage.url})` }} />
        <CardContent sx={{ padding: 0 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <button className={styles.btnUpdate} type="button" onClick={flipCard}>
            update
          </button>
          <Link href={`/admin/category/${categoryId}`}>
            <a className={styles.card__link}>edit words</a>
          </Link>
        </CardActions>
      </div>
      <div className={styles.card__back}>
        {progress ? (
          <CircularProgress />
        ) : (
          <FormProvider {...methods}>
            <CategoryForm
              defaultValue={name}
              coverImageURL={coverImage.url}
              iconURL={icon.url}
              onSubmit={handleSubmit(onSubmit)}
              onClickCancel={unFlipCard}
            />
          </FormProvider>
        )}
      </div>
    </div>
  );
};
