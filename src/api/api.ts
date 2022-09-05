import { IWord, IUser, IUpdateUser, IUserWord, ISignIn, SignIn, ICreateUser, IFetchOptions } from '../interfaces/interfaces'
import { BASEURL, RESPONSE } from './consts';

export const getWords = async (group = 0, page = 0): Promise<{ words: Array<IWord> } | null> => {
  try {
    const data = await fetch(`${BASEURL}/words?group=${group}&page=${page}`);
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
  try {
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
    console.log('ОТВЕТ:', data.status)
    if (data.status === RESPONSE.OK) {
      saveToken(res.token, res.refreshToken, res.userId);
      return res
    }
    if (data.status === RESPONSE.Uncorrect) {
      return null
    }
    return null
  }
  catch (err) {
    console.log("НЕПРАВИЛЬНЫЙ ЛОГИН/ПАРОЛЬ");
    return null
  }
}
function saveToken(token: string, refreshToken: string, userId: string) {
  localStorage.setItem('token', token);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('tokenDate', Date.now().toString())
  localStorage.setItem('userId', userId);
  localStorage.setItem('isAutorization', 'true');
}

export const getRefreshToken = async (userId: string, refreshToken: string) => {
  console.log('ЗАПУСК РЕФРЕШТОКЕНА', refreshToken, userId)
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
  console.log('ТОКЕН ДО', refreshToken, 'ТОКЕН ПОСЛЕ', content.refreshToken)
  saveToken(content.token, content.refreshToken, userId)
  return content.token
}

export const fetchWithAutorization = async (url: string, options?: IFetchOptions) => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  const userId = localStorage.getItem('userId');
  const tokenDate = localStorage.getItem('tokenDate');
  console.log('СРОК ТОКЕНА', (Date.now() - (Number(tokenDate))) / 3600000)
  if (Date.now() - (Number(tokenDate)) >= 3600000) {
    if (userId && refreshToken) {
      const newToken = await getRefreshToken(userId, refreshToken).then(() => {
        console.log('NewToken', newToken)
        if (options) {
          options.headers.Authorization = `Bearer ${newToken}`;
        } else {
          const newToken = token;
        }
      })
    }
  }
  console.log('НОВЫЙ ФЕТЧ', url, options)
  return fetch(url, options);
}
//TODO methods post, put,etc. need validate