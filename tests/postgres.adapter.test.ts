import PostgresAdapter from '../src/v1/adapters/postgres.adapter';
import * as dotenv from 'dotenv-safe';

dotenv.config({ allowEmptyValues: false });

const postgresAdapter = new PostgresAdapter();

describe('PostgresAdapter', () => {
    it('should return all tables', async () => {
        const tables = await postgresAdapter.allTables();
        expect(tables.rows).toBeDefined();
    });
});

describe('execute query', () => {
    it('should return a query result', async () => {
        const query = 'SELECT * FROM public."User1" WHERE alias = $1';
        const values = ['hmd'];
        const result = await postgresAdapter.query(query, values);
        expect(result.rows).toBeDefined();
        console.log(result.rows);
    });
});