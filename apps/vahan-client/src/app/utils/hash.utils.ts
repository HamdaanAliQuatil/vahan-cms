import * as crypto from 'crypto-js';

export const generateHash = (data: unknown): string => {
    console.log('Data:', data);
    const hash = crypto.SHA256(JSON.stringify(data));
    return hash.toString();
};

