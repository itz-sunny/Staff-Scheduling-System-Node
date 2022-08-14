module.exports = (server, sequelize) => {
  ['SIGTERM', 'SIGINT'].forEach((signal) => {
    process.on('SIGINT', () => {
      console.info(`${signal} signal received`);
      console.log('Closing HTTP Server');
      server.close(() => {
        console.log('HTTP Server closed gracefully.');
        sequelize
          .close()
          .then(() => {
            console.log('DB connection closed gracefully');
            process.exit(0);
          })
          .catch((err) => {
            console.error('Error in closing DB connection', err);
          });
      });
    });
  });
};
