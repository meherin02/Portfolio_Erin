import express from 'express';
import {MongoClient} from 'mongodb';
import {fileURLToPath} from 'node:url';
import {join} from 'node:path';

const app = express();
const dist = fileURLToPath(new URL('./dist/', import.meta.url));
const client = process.env.MONGODB_URI && new MongoClient(process.env.MONGODB_URI, {serverSelectionTimeoutMS: 3000});
const attempts = new Map();
const windowMs = 15 * 60 * 1000;

app.disable('x-powered-by');
app.use('/api', express.json({limit: '24kb'}));
app.post('/api/contact', async (req, res) => {
  if (!client) return res.status(503).json({error: 'Contact storage is unavailable.'});
  const fields = ['name', 'email', 'message'];
  const [name, email, message] = fields.map(field => typeof req.body?.[field] === 'string' ? req.body[field].trim() : '');
  if (!name || name.length > 100 || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message || message.length > 4000) {
    return res.status(400).json({error: 'Enter a name, valid email address, and message.'});
  }
  const now = Date.now();
  for (const [ip, entry] of attempts) if (entry.until <= now) attempts.delete(ip);
  const entry = attempts.get(req.ip) || {count: 0, until: now + windowMs};
  if (entry.count >= 5) return res.status(429).json({error: 'Try again later.'});
  entry.count += 1;
  attempts.set(req.ip, entry);
  try {
    await client.db().collection('messages').insertOne({name, email, message, createdAt: new Date()});
    res.status(201).json({ok: true});
  } catch {
    res.status(503).json({error: 'Contact storage is unavailable.'});
  }
});
app.use('/api', (_req, res) => res.status(404).json({error: 'API route not found.'}));
app.use(express.static(dist));
app.get('/{*path}', (_req, res) => res.sendFile(join(dist, 'index.html')));
app.listen(process.env.PORT || 3001, () => console.log('Portfolio server listening on port ' + (process.env.PORT || 3001)));
