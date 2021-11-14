import { CategoryDataToSubmit, WordDataToSubmit } from '../interfaces';
import { Data } from '../types';

type DataToSubmit = CategoryDataToSubmit | WordDataToSubmit;

export const getDataToSubmit = (data: Data): DataToSubmit => {
  const dataToSubmit = <DataToSubmit>{};
  Object.entries(data).forEach(([key, value]) => {
    if (value) {
      dataToSubmit[key] = value;
    }
  });

  return dataToSubmit;
};
