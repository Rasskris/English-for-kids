import { FC } from 'react';
import Box from '@mui/material/Box';
import { InputText, InputFile } from '../../FormControls';
import { EXTENSIONS, FILE_TYPE, ICON_PATH } from '../../../constants';
import styles from './WordAdminCard.module.scss';

interface WordFormProps {
  defaultValueName?: string;
  defaultValueTranslation?: string;
  imageURL: string;
  requiredInputFile?: boolean;
  onChange: (inputFileName: string, file: File | null) => void;
  onSubmit: VoidFunction;
  onClickCancel: VoidFunction;
  onTriggerError?: VoidFunction;
}

export const WordForm: FC<WordFormProps> = ({
  defaultValueName,
  defaultValueTranslation,
  imageURL,
  requiredInputFile,
  onChange,
  onSubmit,
  onClickCancel,
  onTriggerError,
}) => {
  return (
    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
      <InputText type="text" name="name" label="Name" defaultValue={defaultValueName} required />
      <InputText
        type="text"
        name="translation"
        label="Translation"
        defaultValue={defaultValueTranslation}
        required
      />
      <div className={styles.fileInputs}>
        <InputFile
          name="image"
          labelName="Image"
          currentFileSrc={imageURL}
          fileType={FILE_TYPE.IMAGE}
          accept={EXTENSIONS.IMAGE}
          required={requiredInputFile}
          onChange={onChange}
        />
        <InputFile
          name="audio"
          labelName="Audio"
          currentFileSrc={ICON_PATH.AUDIO}
          fileType={FILE_TYPE.AUDIO}
          accept={EXTENSIONS.AUDIO}
          required={requiredInputFile}
          onChange={onChange}
        />
      </div>
      <div>
        <button className={styles.btnSubmit} type="submit" onClick={onTriggerError}>
          Submit
        </button>
        <button className={styles.btnCancel} type="button" onClick={onClickCancel}>
          Cancel
        </button>
      </div>
    </Box>
  );
};

WordForm.defaultProps = {
  defaultValueName: '',
  defaultValueTranslation: '',
  requiredInputFile: false,
};
