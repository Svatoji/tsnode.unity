import dotenv from 'dotenv';
dotenv.config();

export const clientId = process.env.CLIENT_ID || '';
export const clientSecret = process.env.CLIENT_SECRET || '';