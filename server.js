// Ultra-lightweight zero-dependency dev & preview server for Karan Chopra Portfolio
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '127.0.0.1'; // Explicit IPv4 prevents Windows IPv6 [::1] connection refused errors

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.jsx': 'text/javascript; charset=UTF-8',
  '.mjs': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/') reqUrl = '/index.html';

  const distDir = path.join(__dirname, 'dist');
  const hasDist = fs.existsSync(path.join(distDir, 'index.html'));
  const rootDir = hasDist ? distDir : __dirname;

  let decodedPath = decodeURIComponent(reqUrl);
  let filePath = path.join(rootDir, decodedPath);

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(rootDir, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    // HTTP 206 Range Request handling for ultra-smooth video scrubbing
    const range = req.headers.range;
    if (range && (ext === '.mp4' || ext === '.webm' || ext === '.mov')) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : stats.size - 1;

      if (start >= stats.size) {
        res.writeHead(416, { 'Content-Range': `bytes */${stats.size}` });
        res.end();
        return;
      }

      const chunksize = (end - start) + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });
      res.writeHead(206, {
        'Content-Range': `bytes ${start}-${end}/${stats.size}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      fileStream.pipe(res);
      return;
    }

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': stats.size,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    });
  });
});

function startServer(portToTry) {
  server.listen(portToTry, HOST, () => {
    const url = `http://${HOST}:${portToTry}`;
    console.log(`\n======================================================`);
    console.log(`✨ KARAN CHOPRA — ANIMATED PORTFOLIO WEBSITE READY`);
    console.log(`======================================================`);
    console.log(`🚀 Live URL: ${url}`);
    console.log(`🌐 Also available at: http://localhost:${portToTry}`);
    console.log(`🎥 360° Video Hero: Enabled (Range streaming active)`);
    console.log(`⚠️  IMPORTANT: KEEP THIS WINDOW OPEN WHILE BROWSING!`);
    console.log(`   (If you close this window, the local server will stop)`);
    console.log(`======================================================\n`);

    const startCmd = process.platform === 'win32' ? `start ${url}` : `open ${url}`;
    exec(startCmd, () => {});
  });
}

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    PORT += 1;
    console.log(`Port busy, retrying on port ${PORT}...`);
    startServer(PORT);
  } else {
    console.error('Server error:', e);
  }
});

startServer(PORT);
