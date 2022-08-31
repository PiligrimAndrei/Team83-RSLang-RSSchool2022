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

export interface SignIn {
  email: string | null | undefined;
  password: string | null | undefined;
}

export interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export interface IUserWord {
  difficulty: string;
  optional: {
    learned: boolean;
    countUse?: number
    counteCorrect?: number
    countUseSprint?: number
    countCorrectSprint?: number
    countUseAudiocall?: number
    countCorrectAudiocall?: number
  }
}

export interface IFetchOptions {
  method: string
  headers: {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
  };
  body?: string
}