import * as dotenv from 'dotenv';
import { createConnection } from 'typeorm';

import app from './application';

dotenv.config();

// create the typeorm connection
const connection = createConnection({
  type: 'mysql',
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [
    __dirname + '/entity/**/*.ts'
  ]
});

connection
  .then(() => {
    console.log('Connected to DB, starting server...');
    const port = process.env.PORT || 8000;
    app.listen(port, () => {
      // tslint:disable-next-line:no-console
      console.log(`Server started at http://localhost:${port}`);
    });
})
  .catch(error => {
    console.error(`Failed to connect to DB ${error}`);
  });
