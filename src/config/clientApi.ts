import axios from 'axios';
import { API_URL } from '../constants/api';

const clientApi = axios.create({
  baseURL: API_URL,
});

export default clientApi;
