import { FC, memo } from 'react';
import Link from 'next/link';
import DataTable from 'react-data-table-component';
import { Statistics } from '../../interfaces';
import { TABLE_COLUMNS } from '../../constants';
import { statisticsDB } from '../../lib';
import styles from './Table.module.scss';

interface TableProps {
  tableData: Statistics[];
}

export const Table: FC<TableProps> = memo(({ tableData }) => {
  const handleBtnClickReset = async () => {
    await statisticsDB.resetStatistics();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.btnContainer}>
        <button className={styles.btnReset} type="button" onClick={handleBtnClickReset}>
          reset
        </button>
        <Link href="/difficult-words">
          <a className={styles.btnRepeat}>repeat difficult words</a>
        </Link>
      </div>
      <DataTable columns={TABLE_COLUMNS} data={tableData} />
    </div>
  );
});

Table.displayName = 'Table';
