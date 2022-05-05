import { bnetBaseUrl } from '@constants/.';
import axios from 'axios';

const auth = axios.create({
  baseURL: bnetBaseUrl,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default auth;
