import { FILE_TYPE } from '../constants';

export const isImageType = (fileType: FILE_TYPE): boolean => fileType === FILE_TYPE.IMAGE;
