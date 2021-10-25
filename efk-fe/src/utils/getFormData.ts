export const getFormData = (data: Record<string, string | Blob>): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};
