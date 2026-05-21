const logger = require('../utils/logger');

const registerNotificationSocket = (io) => {
  const notificationNamespace = io.of('/notifications');

  notificationNamespace.on('connection', (socket) => {
    logger.debug(`Notification connection opened: ${socket.id}`);

    // Allow user to subscribe to personal alerts channel
    socket.on('register_user_session', (userId) => {
      socket.join(userId);
      logger.debug(`User alerts channel room registered: ${userId}`);
    });

    socket.on('disconnect', () => {
      logger.debug(`Notification connection closed: ${socket.id}`);
    });
  });
};

module.exports = registerNotificationSocket;
