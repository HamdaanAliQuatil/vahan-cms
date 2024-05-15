import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

/**
 * Controller function to create the entity table in the database.
 * @param req Express Request object.
 * @param res Express Response object.
 */
export const createEntityTable = async (req: Request, res: Response): Promise<void> => {
    try {
        await postgresAdapter.createEntityTable();
        res.status(201).json({ message: 'Entity table created successfully' });
    } catch (error) {
        console.error('Error creating entity table:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};