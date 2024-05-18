import express, { Request, Response } from 'express';
import { updateRecord } from '@vahan/v1/controllers/update-record.controller';

const router = express.Router();

/**
 * @swagger
 * /entity/{id}:
 *   put:
 *     summary: Update an existing entity by ID.
 *     description: This endpoint updates an existing entity record in the database based on the specified ID.
 *     parameters:
 *       - name: id
 *         description: The ID of the entity to update.
 *         in: path
 *         required: true
 *         type: integer
 *       - name: name
 *         description: The updated name of the entity.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: email
 *         description: The updated email of the entity.
 *         in: formData
 *         required: false
 *         type: string
 *       - name: mobileNumber
 *         description: The updated mobile number of the entity.
 *         in: formData
 *         required: false
 *         type: number
 *       - name: dateOfBirth
 *         description: The updated date of birth of the entity.
 *         in: formData
 *         required: false
 *         type: string
 *         format: date
 *     responses:
 *       200:
 *         description: Entity updated successfully.
 *       400:
 *         description: Bad request. Invalid input parameters.
 *       404:
 *         description: Entity not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/entity', async (req: Request, res: Response) => {   
    try {
        // Validate the request body
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send('Missing required fields in the request body');
        }

        const hash = req.header('X-Hash');

        if (!hash || typeof hash !== 'string') {
            return res.status(400).send('Missing or invalid hash');
        }
        
        const { isVerified, message } = await updateRecord(req.body, hash);

        if (!isVerified) {
            return res.status(400).send(message);
        }

        res.status(200).send(message);
        return;
    } catch (error) {
        console.error('Error updating entity:', error);
        return res.status(500).send(error); 
    }
});

export default router;