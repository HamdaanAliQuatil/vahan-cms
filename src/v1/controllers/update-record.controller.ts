import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const updateRecord = async (req: Request, res: Response) => {
    try {
        const { searchCriteria, updatedValues } = req.body;
        
        const entity = await postgresAdapter.updateEntity(searchCriteria, updatedValues);
    } catch (error) {
        console.error('Error updating entity:', error);
    }
};