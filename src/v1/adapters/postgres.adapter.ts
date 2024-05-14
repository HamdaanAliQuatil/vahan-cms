import { Pool } from 'pg';
import { config } from '../config';

class PostgresAdapter {
    private pool: Pool;
    
    constructor() {
        this.pool = new Pool(config.db.postgres);

        this.pool.on('error', (err, client) => {
            console.error('Unexpected error on idle client', err);
            process.exit(-1);
        });
    }

    // select all tables from the database
    async allTables() {
        return await this.query('SELECT * FROM information_schema.tables WHERE table_schema = $1', ['public']);
    }
    
    // execute a query
    async query(query: string, values: any[] = []) {
        const client = await this.pool.connect();
        try {
            return await client.query(query, values);
        } finally {
            client.release();
        }
    }
}

export default PostgresAdapter;
