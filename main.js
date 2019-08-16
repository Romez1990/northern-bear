const app = require('./app');
const http = require('http');
const portScanner = require('portscanner');

(async () => {
  const port =
    process.env.PORT || (await portScanner.findAPortNotInUse(3000, 4000));
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });

  server.on('error', onError);

  function onError(error) {
    if (error.syscall !== 'listen') throw error;

    const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }
})();
