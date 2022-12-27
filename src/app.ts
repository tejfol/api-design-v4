import * as dotenv from 'dotenv';
dotenv.config();

import app from './server';

app.listen(8080, () => {
  console.log('Server has been started, host: http://localhost:8080');
});
