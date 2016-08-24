const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = 9000;

http.createServer(function (req, res) {
  console.log(`${req.method} ${req.url}`);

  // parse URL
  const parsedUrl = url.parse(req.url);
  // extract URL path
  const pathname = `.${parsedUrl.pathname}`;
  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  const ext = path.parse(pathname).ext;
  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png'
  };

  // read file from file system
  fs.readFile(pathname, function(err, data){
    if(err){
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
    } else {
      // if the file is found, set Content-type and send data
      res.setHeader('Content-type', map[ext] || 'text/plain' );
      res.end(data);
    }
  });

}).listen(port);

console.log(`Server listening on port ${port}`);
