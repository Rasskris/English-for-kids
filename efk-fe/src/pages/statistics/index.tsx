import { FC, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLiveQuery } from 'dexie-react-hooks';
import CircularProgress from '@mui/material/CircularProgress';
import { useAppSelector } from '../../hooks';
import { selectAuthStatus } from '../../redux/selectors';
import { statisticsDB } from '../../lib';
import { DefaultContent, Table } from '../../components';
import { PAGE } from '../../enums';
import styles from '../../styles/Wrapper.module.scss';

const Statistics: FC = () => {
  const router = useRouter();
  const statisticsData = useLiveQuery(() => statisticsDB.statistics.toArray());
  const isAuth = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (!isAuth) {
      router.push('/auth/signin');
    }
  }, [isAuth]);

  if (!statisticsData || !isAuth) {
    return <CircularProgress size={70} />;
  }

  return (
    <section className={styles.wrapper}>
      {statisticsData.length > 0 ? (
        <Table tableData={statisticsData} />
      ) : (
        <DefaultContent pageName={PAGE.STATISTICS} />
      )}
    </section>
  );
};

export default Statistics;
