import axios from 'axios';
import Item from '../types/items';

const API_URL = 'http://localhost:5001/api/items'; // Replace with your actual API URL

export const createItems = async (item: Item): Promise<Item> => {
    const response = await axios.post(API_URL, item);
    return response.data;
};
