/* eslint-disable react/jsx-props-no-spreading */
import { FC, useState } from 'react';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import classnames from 'classnames';
import { toast } from 'react-toastify';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CircularProgress from '@mui/material/CircularProgress';
import { Word, WordFiles, WordInputs } from '../../../interfaces';
import { useDispatchWithReturn } from '../../../hooks';
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
  const [isFlipped, setIsFlipped] = useState(false);
  const [files, setFiles] = useState<WordFiles>({
    image: null,
    audio: null,
  });
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
      setIsFlipped(false);
      setProgress(false);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
    }
  };

  const handleEditWord = () => {
    setIsFlipped(true);
  };

  const handleDeleteWord = async () => {
    try {
      await dispatch(deleteWord(id));
      toast.success(TOAST_TEXT.WORD_DELETED, TOAST_OPTIONS);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
    }
  };

  const handleClickCancel = () => {
    setIsFlipped(false);
  };

  const handleClickBtnAudio = () => {
    playAudio(audio.url);
  };

  const handleChange = (inputFileName: string, file: File | null) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [inputFileName]: file,
    }));
  };

  return (
    <div className={cardStyle}>
      <div className={styles.card__front}>
        <CardMedia component="img" alt={name} height="140" image={image.url} />
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
          <button className={styles.btnUpdate} type="button" onClick={handleEditWord}>
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
              onChange={handleChange}
              onSubmit={handleSubmit(onSubmit)}
              onClickCancel={handleClickCancel}
            />
          </FormProvider>
        )}
      </div>
    </div>
  );
};
