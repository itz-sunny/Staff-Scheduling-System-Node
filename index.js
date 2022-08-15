const app = require('./src/app.js');
const { sequelize } = require('./src/db/models/index.js');
const shutdownGracefully = require('./src/gracefullShutdown.js');
const { PORT } = require('./config/config.js');

const server = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
  sequelize
    .authenticate()
    .then(() => {
      console.log('DB connection has been established successfully');
    })
    .catch((err) => {
      console.error('Unable to connect to the DB:', err);
    });
});

shutdownGracefully(server, sequelize);
