import express, { NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import createTableRoute  from '@vahan/v1/routes/create-table.route';
import updateRecordRoute from '@vahan/v1/routes/update-record.route';
import readRecordRoute from '@vahan/v1/routes/read-record.route';
import deleteRecordRoute from '@vahan/v1/routes/delete-record.route';
import insertRecordRoute from '@vahan/v1/routes/insert-record.route';

const app = express();
const port = 3000;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());

app.use('/v1', createTableRoute)
app.use('/v1', updateRecordRoute);
app.use('/v1', readRecordRoute);
app.use('/v1', deleteRecordRoute);
app.use('/v1', insertRecordRoute);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

