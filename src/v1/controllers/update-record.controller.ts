import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const updateRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { searchCriteria, updatedValues } = req.body;

        // Validate the request body
        if (!searchCriteria || !updatedValues) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }
        
        const entity = await postgresAdapter.updateEntity(searchCriteria, updatedValues);
        res.status(200).json(entity);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};