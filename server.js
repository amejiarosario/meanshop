const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = 9000;

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  const parsedUrl = url.parse(req.url);
  const pathname = `.${parsedUrl.pathname}`;
  const ext = path.parse(pathname).ext;
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png'
  };

  fs.readFile(pathname, function(err, data){
    if(err){
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
    } else {
      res.setHeader('Content-type', map[ext] || 'text/plain' );
      res.end(data);
    }
  });

}).listen(port);

console.log(`Server listening on port ${port}`);
