import { FC } from 'react';
import SkeletonMui from '@mui/material/Skeleton';
import styles from './Skeleton.module.scss';

export const Skeleton: FC = () => {
  return (
    <div className={styles.container}>
      {Array(8)
        .fill('')
        .map((_, index) => (
          <SkeletonMui
            key={String(index)}
            variant="rectangular"
            animation="wave"
            width={250}
            height={250}
            sx={{ margin: 1 }}
          />
        ))}
    </div>
  );
};
