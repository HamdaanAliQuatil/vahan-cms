import express, { Request, Response } from 'express';
import { deleteRecord } from '@vahan/v1/controllers/delete-record.controller';

const router = express.Router();

/**
 * @swagger
 * /entity/{id}:
 *   delete:
 *     summary: Delete an entity by ID.
 *     description: This endpoint deletes an existing entity record from the database based on the specified ID.
 *     parameters:
 *       - name: id
 *         description: The ID of the entity to delete.
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       204:
 *         description: Entity deleted successfully.
 *       404:
 *         description: Entity not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/entity', async (req: Request, res: Response) => {
    try {
        // Validate the request body
        if (Object.keys(req.body).length === 0) {
            return res.status(400).send('Missing required fields in the request body');
        }

        await deleteRecord(req, res);
        res.status(204).send('Entity deleted successfully');
        return;
    } catch (error) {
        console.error('Error deleting entity:', error);
        return res.status(500).send('Internal server error');
        
    }
});

export default router;