import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const deleteRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { searchCriteria } = req.body;
        
        await postgresAdapter.deleteEntity(searchCriteria);
    } catch (error) {
        console.error('Error deleting entity:', error);
    }
};
