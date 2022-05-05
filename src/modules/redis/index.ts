import { createClient } from 'redis';

const client = createClient();

client.on('error', (error) => console.log('redis error', error));

await client.connect();

export default client;
