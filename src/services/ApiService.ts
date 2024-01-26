import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com/posts';

export const getAllItems = () => axios.get(API_BASE_URL);

export const createItem = (data: any) => axios.post(API_BASE_URL, data);

export const getItemDetails = (id: number) => axios.get(`${API_BASE_URL}/${id}`);

export const updateItem = (id: number, data: any) => axios.put(`${API_BASE_URL}/${id}`, data);

export const deleteItem = (id: number) => axios.delete(`${API_BASE_URL}/${id}`);
