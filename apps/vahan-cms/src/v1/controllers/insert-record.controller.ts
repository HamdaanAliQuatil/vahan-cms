import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';
import { generateHash } from '@vahan/v1/utils/crypto.utils';

const postgresAdapter = new PostgresAdapter();

interface InsertResult {
    isVerified: boolean;
    message: string;
}

export const insertRecord = async (body: any, hash: string): Promise<InsertResult> => {
    try {
        const { name, email, mobileNumber, dateOfBirth } = body;
        const hashFromData = generateHash(JSON.stringify(body)); 

        if (hash !== hashFromData) {
            return { isVerified: false, message: 'Integrity compromised' };
        }

        // Convert dateOfBirth to a Date object
        const dateOfBirthObj = new Date(dateOfBirth);

        // convert mobileNumber to a number
        const mobileNumberObj = Number(mobileNumber);

        await postgresAdapter.createEntity(name, email, mobileNumberObj, dateOfBirthObj);
        return { isVerified: true, message: 'Entity created successfully & integrity verified'};
    } catch (error) {
        console.error('Error creating entity:', error);
        throw new Error('Internal server error');
    }
};
