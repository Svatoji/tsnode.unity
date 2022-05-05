import api from '@modules/battlenet/api';
import { apiUrl } from './constants';

const init = async () => {
  try {
    const response = await api.get(apiUrl.character, {
      params: { name: 'gogatsu', realm: 'Ragnaros' },
    });
  } catch (error) {
    console.log(error);
  }
};

init();
