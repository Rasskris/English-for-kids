import { isFile } from './isFile';

export const formingDataToSubmit = <Type>(data: Type): Type => {
  const dataToSubmit = <Type>{};

  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      dataToSubmit[key] = isFile(value[0]) ? value[0] : value;
    }
  });

  return dataToSubmit;
};
