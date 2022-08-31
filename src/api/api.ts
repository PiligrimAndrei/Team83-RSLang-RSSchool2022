import { IWord, IUser, IUpdateUser, IUserWord, ISignIn, SignIn, ICreateUser, IFetchOptions } from '../interfaces/interfaces'
import { BASEURL, RESPONSE } from './consts';

export const getWords = async (group = 0, page = 0): Promise<{ words: Array<IWord> } | null> => {
  try {
    const data = await fetch(`${BASEURL}/words?group=${group}&page${page}`);
    const res: IWord[] = await data.json()

    if (data.status === RESPONSE.OK) { // TODO in this folder create consts.ts and describe 200 and other codes
      return {
        words: res
      }
    }
    return null
  } catch (err) {
    throw new Error("Error"); // in consts.ts const ERROR = "Error" better describe different errors
  }
}

export const getWord = async (wordID: string): Promise<IWord | null> => {
  try {
    const data = await fetch(`${BASEURL}/words/${wordID}`);
    const res: IWord = await data.json()

    if (data.status === RESPONSE.OK) {
      return res
    }
    return null
  } catch (err) {
    throw new Error("Error");
  }
}

export const signIn = async (user: SignIn): Promise<ISignIn | null> => {
  const data = await fetch(`${BASEURL}/signin`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  const res = await data.json();
  if (data.status === RESPONSE.OK) {
    saveToken(res.token, res.refreshToken, res.userId);
    return res
  }
  if (data.status === RESPONSE.Uncorrect) {
    return null
  }
  return null
}
function saveToken(token: string, refreshToken: string, userId: string) {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('refreshToken', refreshToken);
  sessionStorage.setItem('tokenDate', Date.now().toString())
  sessionStorage.setItem('userId', userId);
  sessionStorage.setItem('isAutorization', 'true');
}

export const getRefreshToken = async (userId: string, refreshToken: string) => {
  const data = await fetch(`${BASEURL}/users/${userId}/tokens`, {
    method: 'GET',
    /*withCredentials: true,*/
    headers: {
      'Authorization': `Bearer ${refreshToken}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await data.json();
  saveToken(content.token, content.refreshToken, userId)
  return content.token
}

export const fetchWithAutorization = async (url: string, options?: IFetchOptions) => {
  const token = sessionStorage.getItem('token');
  const refreshToken = sessionStorage.getItem('refreshToken');
  const userId = sessionStorage.getItem('userId');
  const tokenDate = sessionStorage.getItem('tokenDate');
  console.log(Date.now() - (Number(tokenDate)))
  if (Date.now() - (Number(tokenDate)) <= 3600) {
    if (userId && refreshToken) {
      const newToken = getRefreshToken(userId, refreshToken)
      if (options) {
        options.headers.Authorization = `Bearer ${newToken}`;
        console.log('NewToken', token)
      } else {
        const newToken = token;
      }
    }
  }
  return fetch(url, options);
}
//TODO methods post, put,etc. need validate