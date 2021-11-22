import { useState } from 'react';

export const useFileInputsChange = <Type>(initData: Type) => {
  const [files, setFiles] = useState<Type>(initData);

  const handleFileInputsChange = (inputFileName: string, file: File | null) => {
    setFiles((prevFiles) => ({
      ...prevFiles,
      [inputFileName]: file,
    }));
  };

  return [files, handleFileInputsChange] as const;
};
