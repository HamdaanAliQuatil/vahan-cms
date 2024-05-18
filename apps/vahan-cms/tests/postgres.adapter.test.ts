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

describe('create entity table', () => {
    it('should create the entity table', async () => {
        await postgresAdapter.createEntityTable();
    });
});

describe('insert entity', () => {
    it('should insert an entity', async () => {
        const bday = new Date('1999-01-01');
        await postgresAdapter.createEntity('Hamdaan Ali', 'xyz@gmail.com', 1234567890, bday);
    });
});

describe('search entity', () => {
    it('get entity by name', async () => {
        const values = 'email: \'xyz@gmail.com\'';
        const result = await postgresAdapter.getEntityByCriteria(values);
    });
});

describe('update entity', () => {
    it('update entity by name', async () => {
        const criteria = { name: 'Hamdaan Ali' };
        const values = { email: 'abc@gmail.com' };

        const result = await postgresAdapter.updateEntity(criteria, values);
    });
});

// describe('delete entity', () => {
//     it('delete entity by name', async () => {
//         const criteria = { name: 'Hamdaan Ali' };

//         const result = await postgresAdapter.deleteEntity(criteria);
//     });
// });
