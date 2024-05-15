import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const readRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { searchValue } = req.params;

        // Validate the request body
        if (!searchValue) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }
        
        const entities = await postgresAdapter.getEntityByCriteria(searchValue);
        res.status(200).json(entities);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
