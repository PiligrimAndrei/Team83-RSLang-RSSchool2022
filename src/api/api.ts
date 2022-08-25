import { IWord, IUser, IUpdateUser, IUserWord, ISignIn } from '../interfaces/interfaces'

const baseUrl = 'https://team83-rslang.herokuapp.com';

export const getWords = async (group = 0, page = 0,): Promise<{ words: Array<IWord> } | null> => {
  try {
    const data = await fetch(`${baseUrl}/words?group=${group}&page${page}`);
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
    const data = await fetch(`${baseUrl}/words/${wordID}`);
    const res: IWord = await data.json()

    if (data.status === 200) {
      return res
    }
    return null
  } catch (err) {
    throw new Error("Error");
  }
}

export const getUser = async (UserID: string): Promise<IUser | null> => {
  try {
    const data = await fetch(`${baseUrl}/users/${UserID}`);
    const res: IUser = await data.json()

    if (data.status === 200) {
      return res
    }
    if (data.status === 404) {
      return res // TO DO  User not found
    }
    if (data.status === 401) {
      return res // TO DO  	Access token is missing or invalid
    }
    return null;

  } catch (err) {
    throw new Error("Error");
  }
}
export const createUser = async (user: IUser): Promise<void> => {
  try {
    await fetch(`${baseUrl}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

  }
  catch (err) {
    throw new Error("Error");
  }
}

export const deleteUser = async (userID: string): Promise<void> => {
  try {
    await fetch(`${baseUrl}/user/${userID}`, {
      method: 'DELETE',
    });
  }
  catch (err) {
    throw new Error("Error");
  }
}
export const updateUser = async (user: IUpdateUser): Promise<void> => {
  try {
    await fetch(`${baseUrl}/user/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const signIn = async (user: IUpdateUser): Promise<ISignIn | null> => {
  const data = await fetch(`${baseUrl}/signin`,
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });
  const res: ISignIn = await data.json();
  if (data.status === 200) {
    return res
  }
  return null;
}