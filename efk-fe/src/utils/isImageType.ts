import { FILE_TYPE } from '../enums';

export const isImageType = (fileType: FILE_TYPE): boolean => fileType === FILE_TYPE.IMAGE;
