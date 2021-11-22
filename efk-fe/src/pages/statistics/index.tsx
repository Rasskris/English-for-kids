import { FC } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import CircularProgress from '@mui/material/CircularProgress';
import { statisticsDB } from '../../lib';
import { DefaultContent, Table } from '../../components';
import { PAGE } from '../../constants';
import styles from '../../styles/Wrapper.module.scss';

const Statistics: FC = () => {
  const statisticsData = useLiveQuery(() => statisticsDB.statistics.toArray());

  if (!statisticsData) {
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
