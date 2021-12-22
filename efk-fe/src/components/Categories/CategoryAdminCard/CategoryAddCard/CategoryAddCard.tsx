/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import CardActions from '@mui/material/CardActions';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatchWithReturn, useFlipItem } from '../../../../hooks';
import { createCategory } from '../../../../redux/thunks';
import { ICON_PATH, TOAST_OPTIONS, TOAST_TEXT } from '../../../../constants';
import { CategoryInputs } from '../../../../interfaces';
import { CategoryForm } from '../CategoryForm';
import styles from './CategoryAddCard.module.scss';
import { formingDataToSubmit } from '../../../../utils';

const defaultValues = {
  name: '',
  coverImage: null,
  icon: null,
};

export const CategoryAddCard: FC = () => {
  const [isFlipped, flipCard, unFlipCard] = useFlipItem();
  const [progress, setProgress] = useState(false);
  const [dispatch] = useDispatchWithReturn();
  const methods = useForm<CategoryInputs>({
    mode: 'onSubmit',
    defaultValues,
  });
  const { handleSubmit, reset, trigger } = methods;
  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
  });

  const onSubmit: SubmitHandler<CategoryInputs> = async (data) => {
    try {
      setProgress(true);
      const categoryData = formingDataToSubmit(data);

      await dispatch(createCategory(categoryData));

      toast.success(TOAST_TEXT.CATEGORY_ADDED, TOAST_OPTIONS);
      setProgress(false);
      unFlipCard();
      reset();
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
      setProgress(false);
      reset();
    }
  };

  const handleClickCancel = () => {
    unFlipCard();
    reset(defaultValues);
  };

  const handleTriggerError = () => {
    trigger(['name', 'coverImage', 'icon']);
  };

  return (
    <div className={cardStyle}>
      <div className={styles.card__front}>
        <div className={styles.card__frontImg} style={{ backgroundImage: `url(${ICON_PATH.CARD_ADD})` }} />
        <CardActions>
          <button className={styles.btnAdd} type="button" onClick={flipCard}>
            add new category
          </button>
        </CardActions>
      </div>
      <div className={styles.card__back}>
        {progress ? (
          <CircularProgress role="progressbar" />
        ) : (
          <FormProvider {...methods}>
            <CategoryForm
              coverImageURL={ICON_PATH.IMAGE}
              iconURL={ICON_PATH.IMAGE}
              requiredInputFile
              onTriggerError={handleTriggerError}
              onSubmit={handleSubmit(onSubmit)}
              onClickCancel={handleClickCancel}
            />
          </FormProvider>
        )}
      </div>
    </div>
  );
};
