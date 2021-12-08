/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Category, CategoryInputs } from '../../../interfaces';
import { useDispatchWithReturn, useFileInputsChange, useFlipItem } from '../../../hooks';
import { updateCategory } from '../../../redux/thunks';
import { TOAST_OPTIONS, TOAST_TEXT } from '../../../constants';
import { CategoryForm } from './CategoryForm';
import { getDataToSubmit } from '../../../utils';
import styles from './CategoryAdminCard.module.scss';

interface CategoryCardProps {
  category: Category;
}

export const CategoryEditCard: FC<CategoryCardProps> = ({ category }) => {
  const [isFlipped, flipCard, unFlipCard] = useFlipItem();
  const [progress, setProgress] = useState(false);
  const [files, handleFileInputsChange] = useFileInputsChange({ coverImage: null, icon: null });
  const [dispatch] = useDispatchWithReturn();
  const { id, name, coverImage, icon } = category;
  const methods = useForm<CategoryInputs>();

  const { handleSubmit } = methods;
  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
  });

  const onSubmit: SubmitHandler<CategoryInputs> = async (categoryData) => {
    try {
      const dataToSubmit = getDataToSubmit({ ...categoryData, ...files });

      setProgress(true);
      await dispatch(
        updateCategory({
          categoryId: id,
          categoryData: dataToSubmit,
        }),
      );

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
        <Image
          className={styles.card__frontImg}
          width={250}
          height={250}
          quality={100}
          src={coverImage.url}
          placeholder="blur"
          blurDataURL={coverImage.url}
        />
        <CardContent sx={{ padding: 0 }}>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        </CardContent>
        <CardActions>
          <button className={styles.btnUpdate} type="button" onClick={flipCard}>
            update
          </button>
          <Link href={`/admin/category/${id}`}>
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
              onChange={handleFileInputsChange}
              onSubmit={handleSubmit(onSubmit)}
              onClickCancel={unFlipCard}
            />
          </FormProvider>
        )}
      </div>
    </div>
  );
};
