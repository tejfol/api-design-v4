import express from 'express';
import router from './router';

import morgan from 'morgan';
import helmet from 'helmet';

// middleware
import {protectThis} from './modules/auth';
import {signUp, signIn} from './handlers/user';

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.status(200).json({message: 'hello'});
});

app.use('/api', protectThis, router);

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

// Can be a custom error handler.
app.use((error, req, res, next) => {
  if (error.type === 'auth') {
    res.status(401).json({message: 'not authorized'});
  } else if (error.type === 'input') {
    res.status(401).json({message: 'invalid input'});
  } else {
    res.status(401).json({message: 'oops, server error'});
  }
});

export default app;
