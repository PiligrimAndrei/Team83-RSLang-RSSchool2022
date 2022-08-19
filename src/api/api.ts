import { IWord } from '../interfaces/interfaces'

const baseURL = 'https://team83-rslang.herokuapp.com';

export const getWords = async (group = 0, page = 0,): Promise<{ words: Array<IWord> } | null> => {
  try {
    const data = await fetch(`${baseURL}/words?group=${group}&page${page}`);
    const res: IWord[] = await data.json()

    if (data.status === 200) {
      return {
        words: res
      }
    }
    return null
  } catch (err) {
    throw new Error("Error");
  }
}

export const getWord = async (wordID: string): Promise<IWord | null> => {
  try {
    const data = await fetch(`${baseURL}/words/${wordID}`);
    const res: IWord = await data.json()

    if (data.status === 200) {
      return res
    }
    return null
  } catch (err) {
    throw new Error("Error");
  }
}

