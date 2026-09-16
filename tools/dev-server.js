// Tiny static server for local testing (also accepts the compiled .mind from tools/compile.html?post=1)
const http = require('http'), fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), port = +process.env.PORT || 8803;
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.mind': 'application/octet-stream', '.css': 'text/css' };
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save-target') {
    const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', () => {
      const out = path.join(root, 'targets', 'overlay.mind'); fs.writeFileSync(out, Buffer.concat(chunks)); res.end('wrote ' + out + ' (' + fs.statSync(out).size + ' bytes)'); });
    return;
  }
  if (req.method === 'POST' && req.url.startsWith('/dev-save')) {   // debugging aid: save a posted blob to .dev-out/
    const name = path.basename(new URL(req.url, 'http://x').searchParams.get('name') || 'out.bin'), dir = path.join(root, '.dev-out'); fs.mkdirSync(dir, { recursive: true });
    const chunks = []; req.on('data', c => chunks.push(c)); req.on('end', () => { fs.writeFileSync(path.join(dir, name), Buffer.concat(chunks)); res.end('saved ' + name); }); return;
  }
  let p = decodeURIComponent(req.url.split('?')[0]); if (p === '/') p = '/index.html'; if (!path.extname(p)) p += '.html';
  const f = path.join(root, p);
  if (!f.startsWith(root) || !fs.existsSync(f)) { res.statusCode = 404; return res.end('not found'); }
  res.setHeader('Content-Type', types[path.extname(f)] || 'application/octet-stream'); fs.createReadStream(f).pipe(res);
}).listen(port, () => console.log('AR photobooth dev server on http://localhost:' + port));
