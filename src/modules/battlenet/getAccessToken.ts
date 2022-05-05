import { clientId, clientSecret } from '@configs/env';
import { bnetAuthUrl, redisKeys } from '@constants/.';
import auth from './auth';
import redis from '@modules/redis';
import { isBefore } from 'date-fns';

interface Credentials {
  data: {
    expires_in: string;
    access_token: string;
  };
}

const clientPayload = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;

const getAccessToken = async (): Promise<string> => {
  try {
    const token = await redis.get(redisKeys.bnet.token);
    const expiry = await redis.get(redisKeys.bnet.expiry);
    const now = new Date();

    if (token && expiry && isBefore(now, new Date(expiry))) {
      return token;
    }

    const { data: credentials }: Credentials = await auth.post(bnetAuthUrl, clientPayload);
    now.setSeconds(+credentials.expires_in);

    redis.set(redisKeys.bnet.expiry, now.toISOString());
    redis.set(redisKeys.bnet.token, credentials.access_token);

    return credentials.access_token;
  } catch (error) {
    return error as unknown as string;
  }
};

export default getAccessToken;
