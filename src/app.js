const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const openApiDoucumentation = require('../open-api-documentation.json');
const envReader = require('./envReader');
const registerRoute = require('./routes/register.js');
const userRoute = require('./routes/user.js');
const scheduleRoute = require('./routes/schedule.js');

envReader();

const app = express();

app.use(cors(), express.json());
app.use(
  '/app/v1/docs',
  swaggerUi.serve,
  swaggerUi.setup(openApiDoucumentation),
);
app.use('/app/v1', registerRoute);
app.use('/app/v1/user', userRoute);
app.use('/app/v1/schedule', scheduleRoute);

module.exports = app;
