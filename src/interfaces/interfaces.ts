export interface IWord {
  id: string;
  group: 0;
  page: 0;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
}
export interface IUpdateUser {
  id?: string;
  name: string;
  email: string;
}
export interface IUserWord {
  difficulty: string;
  optional:
  {
    counter: number,
    correct: number,
    uncorrect: number
  }
}
export interface IRoute {
  name: string;
  component: () => void;
}

export interface ISignIn {
  message: string;
  token: string;
  refreshToken: string;
  userID: string;
  name: string;
}