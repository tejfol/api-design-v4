import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
  envConfig = require('./production').default;
} else if (stage === 'testing') {
  envConfig = require('./testing').default;
} else {
  envConfig = require('./local').default;
}

export default merge(
  {
    stage,
    env: process.env.NODE_ENV,
    port: 8080,
    secrets: {
      jwt: process.env.JWT_SECRET,
      database: process.env.DATABASE_URL,
    },
  },
  envConfig
);
