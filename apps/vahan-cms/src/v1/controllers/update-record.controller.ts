import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';
import { generateHash } from '@vahan/v1/utils/crypto.utils';

const postgresAdapter = new PostgresAdapter();

interface UpdateResult {
    isVerified: boolean;
    message: string;
}

export const updateRecord = async (body: any, hash: string): Promise<UpdateResult> => {
    try {
        const { searchCriteria, updatedValues } = body;

        const hashFromData = generateHash(JSON.stringify(body));

        // Compare hash with expected value to verify integrity
        if (hash !== hashFromData) {
            return { isVerified: false, message: 'Integrity compromised' };
        }

        // Check for prototype pollution
        if ('__proto__' in searchCriteria || '__proto__' in updatedValues) {
            return { isVerified: false, message: 'Invalid input parameters' };
        }        

        // Validate the request body
        if (Object.keys(body).length === 0) {
            return { isVerified: false, message: 'Missing required fields in the request body' };
        }

        await postgresAdapter.updateEntity(searchCriteria, updatedValues);
        return { isVerified: true, message: 'Entity updated successfully & integrity verified' };
    } catch (error) {
        console.error('Error updating entity:', error);
        throw new Error('Internal server error');
    }
};