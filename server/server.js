import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const productsFilePath = path.join(__dirname, '../src/data/products.json');
const savedBundleFilePath = path.join(__dirname, 'saved_bundle.json');

// Helper to read products JSON
const getProductsData = () => {
  const raw = fs.readFileSync(productsFilePath, 'utf-8');
  return JSON.parse(raw);
};

// GET /api/products - Serve steps, product catalog, and initial bundle state
app.get('/api/products', (req, res) => {
  try {
    const data = getProductsData();
    res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Failed to read products data:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// POST /api/save-bundle - Persist customer bundle configuration
app.post('/api/save-bundle', (req, res) => {
  try {
    const bundleState = req.body;
    const payload = {
      ...bundleState,
      savedAt: new Date().toISOString()
    };
    fs.writeFileSync(savedBundleFilePath, JSON.stringify(payload, null, 2));
    res.json({
      success: true,
      message: 'Bundle configuration saved successfully on backend!',
      savedAt: payload.savedAt
    });
  } catch (error) {
    console.error('Failed to save bundle:', error);
    res.status(500).json({ success: false, error: 'Failed to save configuration' });
  }
});

// GET /api/saved-bundle - Retrieve last saved bundle configuration
app.get('/api/saved-bundle', (req, res) => {
  try {
    if (fs.existsSync(savedBundleFilePath)) {
      const raw = fs.readFileSync(savedBundleFilePath, 'utf-8');
      return res.json({
        success: true,
        data: JSON.parse(raw)
      });
    }
    res.json({ success: true, data: null });
  } catch (error) {
    console.error('Failed to read saved bundle:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`⚡ [Wyze Backend API] Server running on http://localhost:${PORT}`);
});
