import * as crypto from 'crypto';

export const generateHash = (data: unknown): string => {
    console.log(data);
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(data));
    return hash.digest('hex');
};
