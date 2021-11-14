/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatchWithReturn } from '../../../hooks';
import { createWord } from '../../../redux/thunks';
import { WordFiles, WordInputs } from '../../../interfaces';
import { ICON_PATH, TOAST_OPTIONS, TOAST_TEXT } from '../../../constants';
import { WordForm } from './WordForm';
import styles from './WordAdminCard.module.scss';

interface WordAddCardProps {
  categoryId: string;
}

const defaultValues = {
  name: '',
  translation: '',
  image: null,
  audio: null,
};

export const WordAddCard: FC<WordAddCardProps> = ({ categoryId }) => {
  const [progress, setProgress] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [files, setFiles] = useState<WordFiles>({
    image: null,
    audio: null,
  });
  const methods = useForm<WordInputs>({
    defaultValues,
  });
  const { handleSubmit, reset, trigger } = methods;
  const [dispatch] = useDispatchWithReturn();

  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
  });

  const onSubmit: SubmitHandler<WordInputs> = async (data) => {
    try {
      setProgress(true);
      await dispatch(
        createWord({
          ...data,
          image: files.image,
          audio: files.audio,
          category: categoryId,
        }),
      );
      toast.success(TOAST_TEXT.WORD_ADDED, TOAST_OPTIONS);
      setProgress(false);
      setIsFlipped(false);
      reset(defaultValues);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
      setProgress(false);
    }
  };

  const handleAddWord = () => {
    setIsFlipped(true);
  };

  const handleClickCancel = () => {
    reset(defaultValues);
    setIsFlipped(false);
  };

  const handleChange = (inputFileName: string, file: File | null) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [inputFileName]: file,
    }));
  };

  const handleTriggerError = () => {
    trigger(['name', 'translation', 'image', 'audio']);
  };

  return (
    <div className={cardStyle}>
      <div className={styles.card__front}>
        <CardMedia component="img" alt="add word" height="80%" image={ICON_PATH.CARD_ADD} />
        <CardActions>
          <button className={styles.btnAdd} type="button" onClick={handleAddWord}>
            add new word
          </button>
        </CardActions>
      </div>
      <div className={styles.card__back}>
        {progress ? (
          <CircularProgress />
        ) : (
          <FormProvider {...methods}>
            <WordForm
              imageURL={ICON_PATH.IMAGE}
              requiredInputFile
              onChange={handleChange}
              onSubmit={handleSubmit(onSubmit)}
              onClickCancel={handleClickCancel}
              onTriggerError={handleTriggerError}
            />
          </FormProvider>
        )}
      </div>
    </div>
  );
};
