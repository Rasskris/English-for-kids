import { useState } from 'react';

export const useFlipItem = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const flipItem = () => {
    setIsFlipped(true);
  };

  const unFlipItem = () => {
    if (isFlipped) {
      setIsFlipped(false);
    }
  };

  return [isFlipped, flipItem, unFlipItem] as const;
};
