const http = require('http');

http.createServer(function (req, res) {
  // server code

  console.log(`${req.method} ${req.url}`);

  res.end('Hello World');
}).listen(9000);

console.log('Server listening on port 9000');