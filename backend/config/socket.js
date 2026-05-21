const socketIo = require('socket.io');
const corsOptions = require('./cors');
const logger = require('../utils/logger');

let io = null;

const initSocket = (server) => {
  io = socketIo(server, {
    cors: corsOptions,
    pingTimeout: 60000,
    pingInterval: 25000
  });

  logger.info('Socket.io server successfully configured.');

  io.on('connection', (socket) => {
    logger.debug(`Socket client connected: ${socket.id}`);

    // Join universal user channel if authenticated
    socket.on('join_user', (userId) => {
      socket.join(userId);
      logger.debug(`Socket ${socket.id} joined personal channel: ${userId}`);
    });

    socket.on('disconnect', () => {
      logger.debug(`Socket client disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.io has not been initialized. Please call initSocket first.');
  }
  return io;
};

module.exports = {
  initSocket,
  getIO
};
