const express = require('express');
const connectToMongo = require('./db');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8181;

// STEP 1: CORS Setup - Manual middleware for best reliability in labs
const allowedOrigins = [
  'https://romina1-8080.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai',
  'https://romina1-8181.theiadockernext-0-labs-prod-theiak8s-4-tor01.proxy.cognitiveclass.ai'
];

// Manual CORS middleware (most reliable)
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// STEP 2: REST OF THE MIDDLEWARE
app.use(express.json());

// STEP 3: Connect to your MongoDB
connectToMongo();

// STEP 4: API ROUTES
app.use('/api/auth', require('./routes/auth'));

// STEP 5: Serve your frontend SPA
app.use(express.static(path.join(__dirname, 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// STEP 6: Root test route (optional, not required for React apps)
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// STEP 7: Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
