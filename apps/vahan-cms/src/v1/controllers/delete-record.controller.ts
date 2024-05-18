import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';
import { generateHash } from '@vahan/v1/utils/crypto.utils';

const postgresAdapter = new PostgresAdapter();

interface DeleteResult {
    isVerified: boolean;
    message: string;
}

export const deleteRecord = async (body: any, hash: string): Promise<DeleteResult> => {
    try {
        const hashFromData = generateHash(body.searchCriteria);

        // Compare hash with expected value to verify integrity
        if (hash !== hashFromData) {
            return { isVerified: false, message: 'Integrity compromised' };
        }

        // Validate the request body
        if (Object.keys(body).length === 0) {
            return { isVerified: false, message: 'Missing required fields in the request body' };
        }
        
        // Check for prototype pollution
        if ('__proto__' in body.searchCriteria) {
            return { isVerified: false, message: 'Invalid input parameters' };
        }

        await postgresAdapter.deleteEntity(body.searchCriteria);
        return { isVerified: true, message: 'Entity deleted successfully & integrity verified' };
    } catch (error) {
        console.error('Error deleting entity:', error);
        throw new Error('Internal server error');
    }
};

