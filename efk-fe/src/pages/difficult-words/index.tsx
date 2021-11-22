import { FC } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import CircularProgress from '@mui/material/CircularProgress';
import { statisticsDB } from '../../lib';
import { DefaultContent, WordsContainer } from '../../components';
import { extractWordData } from '../../utils';
import { PAGE } from '../../constants';
import styles from '../../styles/Wrapper.module.scss';

const DifficultWords: FC = () => {
  const statisticsData = useLiveQuery(() => statisticsDB.statistics.where('incorrect').above(0).toArray());

  if (!statisticsData) {
    return <CircularProgress size={70} />;
  }

  return (
    <section className={styles.wrapper}>
      {statisticsData.length > 0 ? (
        <WordsContainer categoryName="Difficult words" words={extractWordData(statisticsData)} />
      ) : (
        <DefaultContent pageName={PAGE.DIFFICULT_WORDS} />
      )}
    </section>
  );
};

export default DifficultWords;
