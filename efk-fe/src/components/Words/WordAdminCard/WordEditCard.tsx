/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import Image from 'next/image';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import { Word, WordInputs } from '../../../interfaces';
import { useDispatchWithReturn, useFileInputsChange, useFlipItem } from '../../../hooks';
import { deleteWord, updateWord } from '../../../redux/thunks';
import { WordForm } from './WordForm';
import { TOAST_OPTIONS, TOAST_TEXT } from '../../../constants';
import { getDataToSubmit, playAudio } from '../../../utils';
import styles from './WordAdminCard.module.scss';

interface WordCardProps {
  word: Word;
}

export const WordEditCard: FC<WordCardProps> = ({ word }) => {
  const [progress, setProgress] = useState(false);
  const [isFlipped, flipCard, unFlipCard] = useFlipItem();
  const [files, handleFileInputsChange] = useFileInputsChange({ image: null, audio: null });
  const methods = useForm<WordInputs>();
  const { handleSubmit } = methods;
  const [dispatch] = useDispatchWithReturn();

  const { id, name, translation, image, audio } = word;
  const cardStyle = classnames(styles.card, {
    [styles.flipped]: isFlipped,
  });

  const onSubmit: SubmitHandler<WordInputs> = async (wordData) => {
    try {
      const dataToSubmit = getDataToSubmit({ ...wordData, ...files });

      setProgress(true);
      await dispatch(
        updateWord({
          wordId: id,
          wordData: dataToSubmit,
        }),
      );
      toast.success(TOAST_TEXT.WORD_UPDATED, TOAST_OPTIONS);
      unFlipCard();
      setProgress(false);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
    }
  };

  const handleDeleteWord = async () => {
    try {
      await dispatch(deleteWord(id));
      toast.success(TOAST_TEXT.WORD_DELETED, TOAST_OPTIONS);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
    }
  };

  const handleClickBtnAudio = () => {
    playAudio(audio.url);
  };

  return (
    <div className={cardStyle}>
      <div className={styles.card__front}>
        <Image width={150} height={150} src={image.url} placeholder="blur" blurDataURL={image.url} />
        <CardContent sx={{ padding: 0 }}>
          <button type="button" className={styles.card__btnAudio} onClick={handleClickBtnAudio} />
          <div className={styles.info}>
            <div>
              <span className={styles.info__title}>Name:</span>
              <span className={styles.info__text}>{name}</span>
            </div>
            <div>
              <span className={styles.info__title}>Transaltion:</span>
              <span className={styles.info__text}>{translation}</span>
            </div>
          </div>
        </CardContent>
        <CardActions>
          <button className={styles.btnUpdate} type="button" onClick={flipCard}>
            update
          </button>
          <button className={styles.btnDelete} type="button" onClick={handleDeleteWord}>
            delete
          </button>
        </CardActions>
      </div>
      <div className={styles.card__back}>
        {progress ? (
          <CircularProgress />
        ) : (
          <FormProvider {...methods}>
            <WordForm
              defaultValueName={name}
              defaultValueTranslation={translation}
              imageURL={image.url}
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
