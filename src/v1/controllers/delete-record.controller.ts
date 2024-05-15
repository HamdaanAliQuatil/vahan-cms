import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const deleteRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { searchCriteria } = req.body;

        // Validate the request body
        if (!searchCriteria) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }
        
        await postgresAdapter.deleteEntity(searchCriteria);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
