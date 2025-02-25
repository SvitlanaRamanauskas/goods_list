import { Good } from "../types/Good";
const API_URL = 'https://fakestoreapi.com/products';

export const getGoods = async () : Promise<Good[]>=> {
  try {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();

  } catch {
    throw new Error('Error fetching goods');
  }
}
