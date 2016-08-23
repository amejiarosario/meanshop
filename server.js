const http = require('http');
const port = 9000;

http.createServer(function (req, res) {
  let body = [];

  console.log(`${req.method} ${req.url}`);

  req
    .on('data', function (data) {
      body.push(data);
    })
    .on('end', function () {
      console.log(`body: ${body.join()}`);
    })
    .on('error', function (err) {
      console.error(err);
      res.end(400, err);
    });

  res.end('bye!');

}).listen(port);

console.log(`Server listening on port ${port}`);
