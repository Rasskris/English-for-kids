import { useState } from 'react';

export const useOpenItem = () => {
  const [isOpened, setIsOpened] = useState(false);

  const toggleItem = () => {
    setIsOpened((prevState) => !prevState);
  };

  const closeItem = () => {
    setIsOpened(false);
  };

  return [isOpened, toggleItem, closeItem] as const;
};
