import express from 'express';
import router from './router';

import morgan from 'morgan';

// middleware
import {protectThis} from './modules/auth';
import {signUp, signIn} from './handlers/user';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(morgan('dev'));

app.use('/api', protectThis, router);

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

export default app;
