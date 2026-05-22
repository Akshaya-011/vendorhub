const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const corsOptions = require('./config/cors');
const requestLogger = require('./middleware/loggerMiddleware');
const errorHandler = require('./middleware/errorMiddleware');
const { apiLimiter } = require('./middleware/rateLimiter');

// Import Route definitions
const authRoutes = require('./routes/authRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const websiteRoutes = require('./routes/websiteRoutes');
const builderRoutes = require('./routes/builderRoutes');
const templateRoutes = require('./routes/templateRoutes');
const aiRoutes = require('./routes/aiRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const productRoutes = require('./routes/productRoutes');
const marketingRoutes = require('./routes/marketingRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const orderRoutes = require('./routes/orderRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Secure backend HTTP response headers using Helmet
app.use(helmet({
  crossOriginResourcePolicy: false // Allows hosting static files locally to render on other local client ports
}));

// Setup dynamic tenant CORS clearance parameters
app.use(cors(corsOptions));

// Enable JSON and URL-encoded parsed payload parameters checks
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Apply standard request tracing loggers
app.use(requestLogger);

// Host static upload assets locally to serve fallback local uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root operational health checkpoint endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'online',
    system: 'VendorHub AI SaaS Backend Engine',
    timestamp: new Date()
  });
});

// Apply rate limiting protectors universally to all endpoints
app.use('/api/v1', apiLimiter);

// Register resource routers
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/vendors', vendorRoutes);

// Compatibility route matching exact user request specifications
app.post('/api/vendors/select-template', require('./controllers/vendorController').selectTemplate);

app.use('/api/v1/websites', websiteRoutes);
app.use('/api/v1/builder', builderRoutes);
app.use('/api/v1/templates', templateRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/marketing', marketingRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/notifications', notificationRoutes);
app.use('/api/v1/admin', adminRoutes);

// Fallback error-handling middleware matching standard JSON outputs
app.use(errorHandler);

module.exports = app;
