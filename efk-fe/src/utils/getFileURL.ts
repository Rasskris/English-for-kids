export const getFileURL = async (input: HTMLInputElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!input.files) {
      return;
    }

    const reader = new FileReader();
    const file = input.files[0];

    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result as string);
    };

    reader.onerror = reject;
  });
};
