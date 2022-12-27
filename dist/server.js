'use strict';
const __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
exports.__esModule = true;
const express_1 = __importDefault(require('express'));
const router_1 = __importDefault(require('./router'));
const morgan_1 = __importDefault(require('morgan'));
// middleware
const auth_1 = require('./modules/auth');
const user_1 = require('./handlers/user');
const app = (0, express_1['default'])();
app.use(express_1['default'].json());
app.use(express_1['default'].urlencoded({extended: true}));
app.use((0, morgan_1['default'])('dev'));
app.use('/api', auth_1.protectThis, router_1['default']);
app.post('/sign-up', user_1.signUp);
app.post('/sign-in', user_1.signIn);
exports['default'] = app;
//# sourceMappingURL=server.js.map
