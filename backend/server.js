const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Serve frontend from parent directory if it exists
app.use(express.static(path.join(__dirname, '..', 'frontend')));

function readData() {
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function writeData(data) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/api/portfolio', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(readData());
});

app.put('/api/portfolio', (req, res) => {
  const current = readData();
  const updated = { ...current, ...req.body };
  if (req.body.contact) {
    updated.contact = { ...current.contact, ...req.body.contact };
  }
  writeData(updated);
  res.json({ message: 'Saved!', data: updated });
});

app.get('/api/endpoints', (req, res) => {
  res.json([
    { method: 'GET', route: '/api/portfolio', description: 'Fetch all portfolio data' },
    { method: 'PUT', route: '/api/portfolio', description: 'Update and save portfolio data' },
    { method: 'GET', route: '/api/endpoints', description: 'List all API endpoints' }
  ]);
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

app.options('*', cors());

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  console.log(`📁 Data file: ${DATA_FILE}`);
});