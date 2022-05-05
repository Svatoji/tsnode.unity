import { bnetApiBaseUrl } from '@constants/.';
import axios from 'axios';
import getAccessToken from './getAccessToken';

const api = axios.create({});

api.interceptors.request.use(async (config) => {
  const character = config?.params?.name;
  const realm = config?.params?.realm;
  const token = await getAccessToken();
  delete config?.params?.name;
  delete config?.params?.realm;

  config.url = `${bnetApiBaseUrl}/${realm.toLowerCase()}/${character.toLowerCase()}${config.url}`;
  config.url += `?namespace=profile-us&locale=en_US&access_token=${token}`;

  return config;
});

export default api;
