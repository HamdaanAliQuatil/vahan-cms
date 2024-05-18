import { Pool, QueryResult } from 'pg';
import { config } from '@vahan/v1/config';

class PostgresAdapter {
    private pool: Pool;
    
    /**
     * Initializes the PostgresAdapter with a connection pool.
     */
    constructor() {
        this.pool = new Pool(config.db.postgres);

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }

    /** 
     *Returns all tables in the database.
     * @returns A Promise resolving to the list of tables.
     */
    async allTables() {
        return await this.query('SELECT * FROM information_schema.tables WHERE table_schema = $1', ['public']);
    }
    
    /**
     * Executes a SQL query with optional parameters.
     * @param query The SQL query to execute.
     * @param values Optional parameter values for the query.
     * @returns A Promise resolving to the query result.
     */
    async query(query: string, values: any[] = []): Promise<QueryResult> {
        const client = await this.pool.connect();
        try {
            return await client.query(query, values);
        } finally {
            client.release();
        }
    }

    /**
     * Creates the 'entity' table in the database if it doesn't exist.
     */
    async createEntityTable(): Promise<void> {
        const query = `
            CREATE TABLE IF NOT EXISTS entity (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                mobile_number BIGINT NOT NULL,
                date_of_birth DATE NOT NULL
            )
        `;
        
        try {
            await this.query(query);
            console.log('Entity table created successfully');
        } catch (error) {
            console.error('Error creating entity table:', error);
        }
    }

    /**
     * Inserts a new entity record into the 'entity' table.
     * @param name The name of the entity.
     * @param email The email of the entity.
     * @param mobileNumber The mobile number of the entity.
     * @param dateOfBirth The date of birth of the entity.
     * @returns A Promise resolving to the inserted entity.
     */
    async createEntity(name: string, email: string, mobileNumber: number, dateOfBirth: Date): Promise<any> {
        const query = `
            INSERT INTO entity (name, email, mobile_number, date_of_birth)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        try {
            const result = await this.query(query, [name, email, mobileNumber, dateOfBirth]);
            return result.rows[0];
        } catch (error) {
            console.error('Error creating entity:', error);
            throw error;
        }
    }

    /**
     * Retrieves entities from the 'entity' table based on the specified search criteria.
     * @param searchValue The value to search for across all columns.
     * @returns A Promise resolving to an array of retrieved entities.
     */
    async getEntityByCriteria(searchValue: string): Promise<any[]> {
        let query = `
            SELECT * FROM entity
            WHERE name ILIKE $1 OR email ILIKE $1 OR mobile_number::text ILIKE $1 OR date_of_birth::text ILIKE $1
        `;
        const values: any[] = [`%${searchValue}%`];
    
        // Check if the searchValue is in the format 'column:value'
        const colonIndex = searchValue.indexOf(':');
        if (colonIndex !== -1) {
            const columnName = searchValue.substring(0, colonIndex).trim();
            const columnValue = searchValue.substring(colonIndex + 1).trim().replace(/'/g, '');
    
            // If column name is recognized, update the query and values array
            if (['name', 'email', 'mobile_number', 'date_of_birth'].includes(columnName)) {
                query = `
                    SELECT * FROM entity
                    WHERE ${columnName} ILIKE $1
                `;
                values[0] = `%${columnValue}%`;
            }
        }
    
        try {
            const result = await this.query(query, values);
            return result.rows;
        } catch (error) {
            console.error('Error retrieving entity:', error);
            throw error;
        }
    }

    /**
     * Updates an existing entity in the 'entity' table based on the specified search criteria.
     * @param searchCriteria An object containing key-value pairs representing the search criteria.
     * @param updatedValues An object containing key-value pairs representing the updated values.
     * @returns A Promise resolving to the updated entity.
     */
    async updateEntity(searchCriteria: Record<string, any>, updatedValues: Record<string, any>): Promise<any> {
        // Construct the SET clause dynamically based on the updated values
        const setClause = Object.keys(updatedValues).map((key, index) => `${key} = $${index + 1}`).join(', ');

        // Construct the WHERE clause dynamically based on the search criteria
        const whereClause = Object.keys(searchCriteria).map((key, index) => `${key} = $${Object.keys(updatedValues).length + index + 1}`).join(' AND ');

        const query = `
            UPDATE entity
            SET ${setClause}
            WHERE ${whereClause}
            RETURNING *
        `;

        const values = [...Object.values(updatedValues), ...Object.values(searchCriteria)];

        try {
            const result = await this.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Error updating entity:', error);
            throw error;
        }
    }

    /**
     * Deletes an entity from the 'entity' table based on the specified search criteria.
     * @param searchCriteria An object containing key-value pairs representing the search criteria.
     * @returns A Promise indicating the success of the deletion operation.
     */
    async deleteEntity(searchCriteria: Record<string, any>): Promise<void> {
        // Construct the WHERE clause dynamically based on the search criteria
        const whereClause = Object.keys(searchCriteria).map((key, index) => `${key} = $${index + 1}`).join(' AND ');

        const query = `
            DELETE FROM entity
            WHERE ${whereClause}
        `;

        const values = Object.values(searchCriteria);

        try {
            await this.query(query, values);
            console.log('Entity deleted successfully');
        } catch (error) {
            console.error('Error deleting entity:', error);
            throw error;
        }
    }
}

export default PostgresAdapter;
