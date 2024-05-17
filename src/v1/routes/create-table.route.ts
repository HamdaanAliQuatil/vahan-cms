import express, { Request, Response } from 'express';
import { createEntityTable } from '@vahan/v1/controllers/create-entity.controller';

const router = express.Router();

/**
 * @swagger
 * /create-table:
 *   post:
 *     summary: Create the entity table.
 *     description: This endpoint creates the entity table in the database if it doesn't exist.
 *     responses:
 *       200:
 *         description: Entity table created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', async (req: Request, res: Response) => {
    try {
        await createEntityTable(req, res);
        res.status(200).send('Entity table created successfully');
        return;
    } catch (error) {
        console.error('Error creating entity table:', error);
        res.status(500).send('Internal server error');
        return;
    }
});

export default router;
