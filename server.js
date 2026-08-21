import express from 'express';
import path from 'node:path';
import fs from 'node:fs';
import handler from './api/[...path].js';

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Explicit favicon handler
app.get(['/favicon.svg', '/public/favicon.svg', '/favicon.ico'], (req, res) => {
  const p = path.join(process.cwd(), 'public', 'favicon.svg');
  if (fs.existsSync(p)) {
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.sendFile(p);
  }
  const rootFav = path.join(process.cwd(), 'favicon.svg');
  if (fs.existsSync(rootFav)) {
    res.setHeader('Content-Type', 'image/svg+xml');
    return res.sendFile(rootFav);
  }
  res.status(404).end();
});

// Handle all API routes first to guarantee JSON responses and prevent HTML fallthrough
app.all(/^\/api(\/.*)?$/, async (req, res, next) => {
  try {
    await handler(req, res);
  } catch (err) {
    if (!res.headersSent) {
      res.status(err.status || 500).json({ error: err.message || 'Unexpected server error.' });
    }
  }
});

// Serve static assets with explicit mappings
app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));
app.use('/public/images', express.static(path.join(process.cwd(), 'public', 'images')));
app.use('/public', express.static(path.join(process.cwd(), 'public')));
app.use(express.static(path.join(process.cwd(), 'public')));
app.use(express.static(process.cwd()));

// Direct handler for zodiac images - serve high quality PNG medallions
app.get(['/images/zodiac/:sign.:ext', '/images/zodiac_gold/:sign.:ext', '/public/images/zodiac/:sign.:ext', '/public/images/zodiac_gold/:sign.:ext', '/images/zodiac/:sign', '/public/images/zodiac/:sign'], (req, res, next) => {
  const sign = req.params.sign.toLowerCase().replace(/[^a-z]/g, '');
  const candidates = [
    path.join(process.cwd(), 'public', 'images', 'zodiac', `${sign}.png`),
    path.join(process.cwd(), 'public', 'images', 'zodiac_gold', `${sign}.png`),
    path.join(process.cwd(), 'images', 'zodiac', `${sign}.png`),
    path.join(process.cwd(), 'public', 'images', 'zodiac', `${sign}.svg`),
    path.join(process.cwd(), 'images', 'zodiac', `${sign}.svg`)
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const mime = candidate.endsWith('.png') ? 'image/png' : candidate.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg';
      res.setHeader('Content-Type', mime);
      res.setHeader('Cache-Control', 'public, max-age=86400');
      return res.sendFile(candidate);
    }
  }
  next();
});

// Fallback for API routes that were unmatched
app.use('/api', (req, res) => {
  if (!res.headersSent) {
    res.status(404).json({ error: 'API route not found' });
  }
});

// Fallback to index.html for SPA client routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  if (req.method !== 'GET') return next();
  res.sendFile(path.join(process.cwd(), 'index.html'));
});

// Global Express error handler
app.use((err, req, res, _next) => {
  console.error('[Jyotish Vimarsha Server Error]', err);
  if (res.headersSent) return;
  const status = Number(err.status || err.statusCode) || 500;
  res.status(status).json({ error: err.message || 'Unexpected server error.' });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[Jyotish Vimarsha] Express server listening on http://0.0.0.0:${PORT}`);
});

// Export preparation timestamp: Wed Aug 19 08:30:35 PM UTC 2026
