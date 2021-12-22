/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent, FC, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { toast } from 'react-toastify';
import { getFileURL, isImageType } from '../../utils';
import { FILE_TYPE } from '../../enums';
import { ICON_PATH, LABEL_TEXT, TOAST_OPTIONS } from '../../constants';
import styles from './InputFile.module.scss';

interface InputFileProps {
  name: string;
  labelName: string;
  fileType: FILE_TYPE;
  accept: string;
  currentFileSrc: string;
  required: boolean;
}

export const InputFile: FC<InputFileProps> = ({
  name,
  labelName,
  fileType,
  accept,
  currentFileSrc,
  required,
}) => {
  const [fileSrc, setFileSrc] = useState(currentFileSrc);
  const {
    register,
    getValues,
    setValue,
    formState: { errors },
  } = useFormContext();
  const values = getValues();

  const handleChange = async ({ target }: ChangeEvent<HTMLInputElement>) => {
    try {
      const newFileSrc = isImageType(fileType) ? await getFileURL(target) : ICON_PATH.AUDIO_LOADED;

      setValue(name, target.files);
      setFileSrc(newFileSrc);
    } catch (error) {
      toast.error(error.message, TOAST_OPTIONS);
    }
  };

  return (
    <label
      className={styles.labelFile}
      data-text={isImageType(fileType) ? LABEL_TEXT.IMAGE : LABEL_TEXT.AUDIO}
    >
      <ErrorMessage className={styles.error} errors={errors} name={name} as="p" />
      <p className={styles.name}>{labelName}</p>
      <div
        className={styles.preview}
        style={{ backgroundImage: `url(${values[name] ? fileSrc : currentFileSrc})` }}
      />
      <input
        {...register(name, {
          required: {
            value: required,
            message: 'Choose file',
          },
        })}
        className={styles.inputFile}
        type="file"
        accept={accept}
        onChange={handleChange}
        required={required}
      />
    </label>
  );
};
