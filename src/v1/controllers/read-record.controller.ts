import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const readRecord = async (req: Request, res: Response) => {
    try {
        const { searchValue } = req.params;
        
        const entities = await postgresAdapter.getEntityByCriteria(searchValue);

        return entities;
    } catch (error) {
        console.error('Error reading entity:', error);
    }
};
