import { FC } from 'react';
import Box from '@mui/material/Box';
import { InputText, InputFile } from '../../FormControls';
import { FILE_TYPE } from '../../../enums';
import { EXTENSIONS } from '../../../constants';
import styles from './CategoryAdminCard.module.scss';

interface CategoryFormProps {
  defaultValue?: string;
  coverImageURL: string;
  iconURL: string;
  requiredInputFile?: boolean;
  onTriggerError?: VoidFunction;
  onChange: (inputFileName: string, file: File | null) => void;
  onSubmit: VoidFunction;
  onClickCancel: VoidFunction;
}

export const CategoryForm: FC<CategoryFormProps> = ({
  defaultValue,
  coverImageURL,
  iconURL,
  requiredInputFile,
  onTriggerError,
  onChange,
  onSubmit,
  onClickCancel,
}) => {
  return (
    <Box role="form" className={styles.form} component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
      <InputText type="text" name="name" label="Name" defaultValue={defaultValue} required />
      <div className={styles.fileInputs}>
        <InputFile
          name="coverImage"
          labelName="Cover image"
          currentFileSrc={coverImageURL}
          fileType={FILE_TYPE.IMAGE}
          accept={EXTENSIONS.IMAGE}
          required={requiredInputFile}
          onChange={onChange}
        />
        <InputFile
          name="icon"
          labelName="Icon"
          currentFileSrc={iconURL}
          fileType={FILE_TYPE.IMAGE}
          accept={EXTENSIONS.IMAGE}
          required={requiredInputFile}
          onChange={onChange}
        />
      </div>
      <div>
        <button className={styles.btnSubmit} type="submit" aria-label="submit" onClick={onTriggerError}>
          Submit
        </button>
        <button className={styles.btnCancel} type="button" aria-label="cancel" onClick={onClickCancel}>
          Cancel
        </button>
      </div>
    </Box>
  );
};

CategoryForm.defaultProps = {
  requiredInputFile: false,
  defaultValue: '',
};
