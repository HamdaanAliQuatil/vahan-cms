import express, { Request, Response } from 'express';
import { insertRecord } from '@vahan/v1/controllers/insert-record.controller';

const router = express.Router();

const validateRequestBody = (req: Request, res: Response, next: Function) => {
    const { name, email, mobileNumber, dateOfBirth } = req.body;
    
    // Check if required fields are missing
    if (!name || !email || !mobileNumber || !dateOfBirth) {
        return res.status(400).send('Missing required fields');
    }

    // Convert dateOfBirth to a Date object
    const dateOfBirthObj = new Date(dateOfBirth);
    if (dateOfBirthObj.toString() === 'Invalid Date') {
        return res.status(400).send('Invalid dateOfBirth');
    }

    // Convert mobileNumber to a number
    const mobileNumberObj = Number(mobileNumber);
    if (isNaN(mobileNumberObj)) {
        return res.status(400).send('Invalid mobileNumber');
    }

    // Call next middleware if validation passes
    next();
};

/**
 * @swagger
 * /entity:
 *   post:
 *     summary: Create a new entity.
 *     description: This endpoint creates a new entity record in the database.
 *     parameters:
 *       - name: name
 *         description: The name of the entity.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: email
 *         description: The email of the entity.
 *         in: formData
 *         required: true
 *         type: string
 *       - name: mobileNumber
 *         description: The mobile number of the entity.
 *         in: formData
 *         required: true
 *         type: number
 *       - name: dateOfBirth
 *         description: The date of birth of the entity.
 *         in: formData
 *         required: true
 *         type: string
 *         format: date
 *     responses:
 *       201:
 *         description: Entity created successfully.
 *       400:
 *         description: Bad request. Invalid input parameters.
 *       500:
 *         description: Internal server error.
 */
router.post('/entity', validateRequestBody, async (req: Request, res: Response) => {
    try {
        await insertRecord(req, res);
        res.status(201).send('Entity created successfully');
    } catch (error) {
        console.error('Error creating entity:', error);
        res.status(500).send('Internal server error');
    }
});

export default router;
