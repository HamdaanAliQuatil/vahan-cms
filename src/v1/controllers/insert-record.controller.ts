import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const insertRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, mobileNumber, dateOfBirth } = req.body;

        // Validate the request body
        if (!name || !email || !mobileNumber || !dateOfBirth) {
            res.status(400).json({ error: 'Invalid request body' });
            return;
        }

        // Convert dateOfBirth to a Date object
        const dateOfBirthObj = new Date(dateOfBirth);
        if (dateOfBirthObj.toString() === 'Invalid Date') {
            res.status(400).json({ error: 'Invalid dateOfBirth' });
            return;
        }

        // convert mobileNumber to a number
        const mobileNumberObj = Number(mobileNumber);
        if (isNaN(mobileNumberObj)) {
            res.status(400).json({ error: 'Invalid mobileNumber' });
            return;
        }

        const entity = await postgresAdapter.createEntity(name, email, mobileNumberObj, dateOfBirthObj);
        res.status(201).json(entity);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
