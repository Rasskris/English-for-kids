import { render } from 'test-utils';
import { WordCard } from '../../components';
import { mockedWord } from '../../__mocks__/mockedWord';
import { GAME_MODE } from '../../enums';

describe('WordCard', () => {
  test('should visible buttons play audio and flip card when mode train', () => {
    const { getByRole } = render(
      <WordCard gameMode={GAME_MODE.TRAIN} categoryName="test" word={mockedWord} />,
    );
    const buttonAudio = getByRole('button', { name: 'play' });
    const buttonFlip = getByRole('button', { name: 'flip' });

    expect(buttonAudio).toBeVisible();
    expect(buttonFlip).toBeVisible();
  });
});
