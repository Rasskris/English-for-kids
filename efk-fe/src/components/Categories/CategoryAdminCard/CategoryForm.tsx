import { FC } from 'react';
import Box from '@mui/material/Box';
import { InputText, InputFile } from '../../FormControls';
import { EXTENSIONS, FILE_TYPE } from '../../../constants';
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
    <Box className={styles.form} component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
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

CategoryForm.defaultProps = {
  requiredInputFile: false,
  defaultValue: '',
};
