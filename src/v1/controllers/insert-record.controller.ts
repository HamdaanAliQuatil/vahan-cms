import { Request, Response } from 'express';
import PostgresAdapter from '@vahan/v1/adapters/postgres.adapter';

const postgresAdapter = new PostgresAdapter();

export const insertRecord = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, mobileNumber, dateOfBirth } = req.body;

        // Convert dateOfBirth to a Date object
        const dateOfBirthObj = new Date(dateOfBirth);

        // convert mobileNumber to a number
        const mobileNumberObj = Number(mobileNumber);

        const entity = await postgresAdapter.createEntity(name, email, mobileNumberObj, dateOfBirthObj);
    } catch (error) {
        console.error('Error creating entity:', error);
    }
};
