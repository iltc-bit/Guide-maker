const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.ts': 'text/javascript; charset=utf-8',
  '.tsx': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];
  let filePath = urlPath === '/' ? './index.html' : '.' + urlPath;
  const fullPath = path.resolve(__dirname, filePath);

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.resolve(__dirname, './index.html');
      fs.readFile(indexPath, (err, content) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content, 'utf-8');
      });
      return;
    }

    const extname = String(path.extname(fullPath)).toLowerCase();
    const contentType = MIME_TYPES[extname] || 'application/octet-stream';

    fs.readFile(fullPath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end('Server Error');
      } else {
        res.writeHead(200, { 
          'Content-Type': contentType,
          'X-Content-Type-Options': 'nosniff',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache'
        });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});