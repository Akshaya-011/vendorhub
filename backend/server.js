const http = require('http');
// Load environment configurations from dotenv
require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/db');
const socketConfig = require('./config/socket');
const logger = require('./utils/logger');

// Import WebSocket namespace event registers
const registerBuilderSocket = require('./sockets/builderSocket');
const registerAnalyticsSocket = require('./sockets/analyticsSocket');
const registerNotificationSocket = require('./sockets/notificationSocket');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  // 1. Establish database connection first
  await connectDB();

  // 2. Create HTTP server instance wrapping Express app
  const server = http.createServer(app);

  // 3. Setup WebSocket listener wrapper
  const io = socketConfig.initSocket(server);

  // 4. Attach real-time feature sockets namespaces
  registerBuilderSocket(io);
  registerAnalyticsSocket(io);
  registerNotificationSocket(io);

  // 5. Open socket listeners
  server.listen(PORT, () => {
    logger.success(`========================================================================`);
    logger.success(`   VENDORHUB BACKEND ENGINE RUNNING SUCCESSFULLY IN ${process.env.NODE_ENV || 'development'} MODE`);
    logger.success(`   Active HTTP Listener: http://localhost:${PORT}`);
    logger.success(`   Active WebSockets Gateway: ws://localhost:${PORT}`);
    logger.success(`========================================================================`);
  });

  // Handle server-wide unexpected rejections/exceptions gracefully to prevent hard crashes
  process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection caught at process boundary: ', err);
  });

  process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception caught at process boundary: ', err);
  });
};

startServer();
