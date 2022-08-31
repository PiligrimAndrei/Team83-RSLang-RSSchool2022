import { IUserWord } from "../interfaces/interfaces";
import { fetchWithAutorization } from "./api";
import { BASEURL } from "./consts";

export const createUserWord = async (userId: string, wordId: string, word: IUserWord) => {
  const token = sessionStorage.getItem('token')
  const data = await fetchWithAutorization(`${BASEURL}/users/${userId}/words/${wordId}`, {
    method: 'POST',
    /*withCredentials: true,*/
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(word)
  });
  const content = await data.json();
  console.log(content)
};

export const getUserWords = async (userId: string) => {
  const token = sessionStorage.getItem('token')
  const data = await fetchWithAutorization(`${BASEURL}/users/${userId}/words`, {
    method: 'GET',
    /*withCredentials: true,*/
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
  const content = await data.json();
  console.log(content)
}