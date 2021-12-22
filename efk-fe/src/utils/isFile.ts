export const isFile = (value: string | File): value is File => {
  return value instanceof File;
};
