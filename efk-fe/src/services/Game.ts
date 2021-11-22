import type { Dispatch } from 'redux';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Word } from '../interfaces';
import { playAudio, shuffleArray } from '../utils';
import { ANSWER, SRC_SERVICE_AUDIO } from '../constants';
import { addAnswer, addMistake, finishGame } from '../redux/slices';
import { statisticsDB } from '../lib';

class Game {
  private countMistakes: number;

  private wordIndex: number;

  private currentWord: null | Word;

  private shuffledWords: null | Word[];

  private dispatch: Dispatch;

  constructor() {
    this.setInitProperties();
  }

  public startGame(words: Word[], dispatch: Dispatch): void {
    this.setInitProperties();
    this.dispatch = dispatch;
    this.shuffleWords(words);
    this.currentWord = this.shuffledWords[this.wordIndex];
    this.playWordAudio();
  }

  private shuffleWords(words: Word[]) {
    this.shuffledWords = shuffleArray(words);
  }

  private setCurrentWord() {
    this.currentWord = this.shuffledWords[(this.wordIndex += 1)];
  }

  private playWordAudio() {
    const { audio } = this.currentWord;

    playAudio(audio.url);
  }

  private playServiceAudio(audioSrc: string) {
    playAudio(audioSrc);
  }

  public repeatWordAudio() {
    this.playWordAudio();
  }

  private playNextWordAudio() {
    this.setCurrentWord();
    setTimeout(() => this.playWordAudio(), 1000);
  }

  public handleSelectedWord(selectedWordId: number, category: string): ANSWER {
    if (this.currentWord.id === selectedWordId) {
      this.dispatch(addAnswer(ANSWER.RIGHT));
      this.playServiceAudio(SRC_SERVICE_AUDIO.RIGHT_ANSWER);
      statisticsDB.incementCorrect({ ...this.currentWord, category });

      this.isLastWord ? this.finishGame() : this.playNextWordAudio();

      return ANSWER.RIGHT;
    }
    this.countMistakes += 1;
    this.dispatch(addAnswer(ANSWER.WRONG));
    this.dispatch(addMistake());
    this.playServiceAudio(SRC_SERVICE_AUDIO.WRONG_ANSWER);
    statisticsDB.incrementIncorrect({ ...this.currentWord, category });

    return ANSWER.WRONG;
  }

  private get isLastWord() {
    return this.wordIndex === this.shuffledWords.length - 1;
  }

  private finishGame() {
    this.dispatch(finishGame());
    this.countMistakes
      ? this.playServiceAudio(SRC_SERVICE_AUDIO.FAILED_GAME)
      : this.playServiceAudio(SRC_SERVICE_AUDIO.WON_GAME);
  }

  private setInitProperties() {
    this.countMistakes = 0;
    this.wordIndex = 0;
  }
}

export const gameService = new Game();
