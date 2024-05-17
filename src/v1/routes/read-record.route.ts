import express, { Request, Response } from 'express';
import { readRecord } from '@vahan/v1/controllers/read-record.controller';
import e from 'express';

const router = express.Router();

/**
 * @swagger
 * /entity:
 *   get:
 *     summary: Get entities by criteria.
 *     description: This endpoint retrieves entities from the database based on the specified search criteria.
 *     parameters:
 *       - name: searchValue
 *         description: The value to search for across all columns.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Entities retrieved successfully.
 *       500:
 *         description: Internal server error.
 */
router.get('/entity/:searchValue', async (req: Request, res: Response) => {   
    try {
        const entities = await readRecord(req, res);
        res.status(200).json(entities);
        return;
    } catch (error) {
        console.error('Error retrieving entities:', error);
        return res.status(500).send(error);
    }
});

export default router;
