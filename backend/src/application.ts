import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';

import eventsRouter from './routes/events';
import pingRouter from './routes/ping';

const app = express();

// Apply some basic middleware to the server
app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// API
app.use(pingRouter);
app.use('/events', eventsRouter);

export default app;
