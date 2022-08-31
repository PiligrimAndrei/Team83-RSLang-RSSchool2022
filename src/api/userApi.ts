import { IUser, ICreateUser, IUpdateUser } from "../interfaces/interfaces";
import { BASEURL } from "./consts";

export const getUser = async (UserID: string): Promise<IUser | null> => {
  try {
    const data = await fetch(`${BASEURL}/users/${UserID}`);
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
export const createUser = async (user: ICreateUser): Promise<void> => {
  try {
    await fetch(`${BASEURL}/users`, {
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
    await fetch(`${BASEURL}/user/${userID}`, {
      method: 'DELETE',
    });
  }
  catch (err) {
    throw new Error("Error");
  }
}
export const updateUser = async (user: IUpdateUser): Promise<void> => {
  try {
    await fetch(`${BASEURL}/user/${user.id}`, {
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