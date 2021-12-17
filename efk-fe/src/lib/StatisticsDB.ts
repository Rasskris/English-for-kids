import Dexie, { Table } from 'dexie';
import { Word, Statistics } from '../interfaces';

interface IncomingStatisticsData extends Word {
  category: string;
}

enum DEFAULT_FIELD_NAME {
  TRAINED = 'trained',
  CORRECT = 'correct',
  INCORRECT = 'incorrect',
}

const initialValues = {
  trained: 0,
  correct: 0,
  incorrect: 0,
};

export class StatisticsDB extends Dexie {
  statistics!: Table<Statistics, number>;

  constructor() {
    super('StatisticsDB');
    this.version(1).stores({
      statistics: '++id, incorrect',
    });
    this.open();
  }

  private async populate(fieldName: DEFAULT_FIELD_NAME, data: IncomingStatisticsData): Promise<void> {
    await this.statistics.add({
      ...data,
      ...initialValues,
      [fieldName]: 1,
    });
  }

  public async incrementTrained(statisticsData: IncomingStatisticsData): Promise<void> {
    const existStatisticsItem = await this.statistics.get(statisticsData.id);

    if (!existStatisticsItem) {
      await this.populate(DEFAULT_FIELD_NAME.TRAINED, statisticsData);
    } else {
      await this.statistics.update(statisticsData.id, { trained: existStatisticsItem.trained + 1 });
    }
  }

  public async incementCorrect(statisticsData: IncomingStatisticsData): Promise<void> {
    const existStatisticsItem = await this.statistics.get(statisticsData.id);

    if (!existStatisticsItem) {
      await this.populate(DEFAULT_FIELD_NAME.CORRECT, statisticsData);
    } else {
      await this.statistics.update(statisticsData.id, { correct: existStatisticsItem.correct + 1 });
    }
  }

  public async incrementIncorrect(statisticsData: IncomingStatisticsData): Promise<void> {
    const existStatisticsItem = await this.statistics.get(statisticsData.id);

    if (!existStatisticsItem) {
      await this.populate(DEFAULT_FIELD_NAME.INCORRECT, statisticsData);
    } else {
      await this.statistics.update(statisticsData.id, { incorrect: existStatisticsItem.incorrect + 1 });
    }
  }

  public async resetStatistics(): Promise<void> {
    this.transaction('rw', this.statistics, async () => {
      await this.statistics.toCollection().modify(initialValues);
    });
  }
}

export const statisticsDB = new StatisticsDB();
