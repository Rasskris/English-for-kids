import { FC, memo } from 'react';
import Box from '@mui/material/Box';
import { InputText, InputFile } from '../../../FormControls';
import { FILE_TYPE } from '../../../../enums';
import { EXTENSIONS, ICON_PATH } from '../../../../constants';
import styles from './WordForm.module.scss';

interface WordFormProps {
  defaultValueName?: string;
  defaultValueTranslation?: string;
  imageURL: string;
  requiredInputFile?: boolean;
  onSubmit: VoidFunction;
  onClickCancel: VoidFunction;
  onTriggerError?: VoidFunction;
}

export const WordForm: FC<WordFormProps> = memo(
  ({
    defaultValueName,
    defaultValueTranslation,
    imageURL,
    requiredInputFile,
    onSubmit,
    onClickCancel,
    onTriggerError,
  }) => {
    return (
      <Box role="form" component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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
          />
          <InputFile
            name="audio"
            labelName="Audio"
            currentFileSrc={ICON_PATH.AUDIO}
            fileType={FILE_TYPE.AUDIO}
            accept={EXTENSIONS.AUDIO}
            required={requiredInputFile}
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
  },
);

WordForm.displayName = 'WordForm';

WordForm.defaultProps = {
  defaultValueName: '',
  defaultValueTranslation: '',
  requiredInputFile: false,
};
