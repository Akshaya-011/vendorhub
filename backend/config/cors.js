const logger = require('../utils/logger');

// Dynamically check origin to allow subdomains of vendorhub.com and other approved clients
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:5173', // Vite standard port
  'https://vendorhub.com',
  'https://admin.vendorhub.com'
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow server-to-server or postman requests (origin is undefined)
    if (!origin) return callback(null, true);
    
    // Check if origin is in approved list
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    }
    
    // Support wildcard local testing or vendorhub subdomains like *.vendorhub.com
    const isLocalhost = /^http:\/\/localhost:\d+$/.test(origin);
    const isSubdomain = /\.vendorhub\.com$/.test(origin);

    if (isLocalhost || isSubdomain) {
      return callback(null, true);
    }
    
    logger.warn(`Blocked by CORS policy: Origin ${origin} not allowed`);
    return callback(new Error('Not allowed by CORS'), false);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'X-Requested-With', 
    'Accept', 
    'Origin',
    'x-vendor-id' // Custom SaaS header if needed
  ],
  credentials: true,
  optionsSuccessStatus: 200
};

module.exports = corsOptions;
