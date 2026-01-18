
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.ts': 'text/javascript',
  '.tsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  // 取得純粹的 URL 路徑，過濾掉 query string
  let urlPath = req.url.split('?')[0];
  let filePath = urlPath === '/' ? './index.html' : '.' + urlPath;
  
  const fullPath = path.resolve(__dirname, filePath);
  const extname = String(path.extname(fullPath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // 如果找不到檔案（例如客戶端路由），回退到 index.html
      fs.readFile(path.resolve(__dirname, './index.html'), (err, indexContent) => {
        if (err) {
          res.writeHead(404);
          res.end('Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(indexContent, 'utf-8');
      });
      return;
    }

    fs.readFile(fullPath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      } else {
        // 設定關鍵 Header 確保瀏覽器不會因為安全策略阻擋 .tsx 解析
        res.writeHead(200, { 
          'Content-Type': contentType,
          'X-Content-Type-Options': 'nosniff',
          'Cache-Control': 'no-cache'
        });
        res.end(content, 'utf-8');
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
