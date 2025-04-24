import axios from "axios";
import { User } from "../types/User";

const BASE_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const updateUser = async (id: number, data: Partial<User>) => {
  // Simulated PUT
  return axios.put(`${BASE_URL}/${id}`, data);
};

export const deleteUser = async (id: number) => {
  // Simulated DELETE
  return axios.delete(`${BASE_URL}/${id}`);
};

export const createUser = async (data: Partial<User>) => {
  // Simulated POST
  return axios.post(BASE_URL, data);
};
