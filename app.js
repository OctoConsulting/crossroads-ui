var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

const app = http.createServer(function (req, res) {

  // parse URL
  let parsedUrl; 
  try {
    parsedUrl = url.parse(req.url);
  } catch (error) {
    console.error("Issue parsing url...");
    console.error(error);
  }

  // extract URL path
  let pathname = `${parsedUrl.pathname}`;

  // based on the URL path, extract the file extention. e.g. .js, .doc, ...
  let ext;
  try {
    ext = path.parse(pathname).ext;
  } catch (error) {
    console.error("Error parsing pathname...");
    console.error(error);
  }

  // maps file extention to MIME typere
  const map = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword'
  };
  
  // Serve index if route is an Angular route
  if (pathname === '/' || !ext) {
    pathname = __dirname + '/ng-crossroads/dist/ng-crossroads/index.html';
    ext = '.html';
  } else {
    pathname = __dirname + '/ng-crossroads/dist/ng-crossroads/' + pathname;
  }

  fs.exists(pathname, function (exist) {
    if(!exist) {
      // if the file is not found, return 404
      res.statusCode = 404;
      res.end(`File ${pathname} not found!`);
      return;
    }

    // read file from file system
    fs.readFile(pathname, function(err, data){
      if(err){
        res.statusCode = 500;
        res.send(``)
        res.end(`Error getting the file: ${err}.`);
      } else {
        // if the file is found, set Content-type and send data
        res.setHeader('Content-type', map[ext] || 'text/plain' );
        res.end(data);
      }
    });
  });


}).listen(parseInt(port));
  
console.log(`Server listening on port ${port}`);

module.exports = app;
