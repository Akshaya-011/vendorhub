const logger = require('../utils/logger');

const registerAnalyticsSocket = (io) => {
  const analyticsNamespace = io.of('/analytics');

  analyticsNamespace.on('connection', (socket) => {
    logger.debug(`Analytics Monitor Socket connected: ${socket.id}`);

    // Join vendor live monitoring room
    socket.on('join_analytics_monitor', (vendorId) => {
      socket.join(vendorId);
      logger.debug(`Analytics client ${socket.id} joined live tracking stream: ${vendorId}`);
    });

    // Handle incoming client site actions (e.g. page views, checkouts) to report instantly
    socket.on('frontend_visitor_action', (data) => {
      const { vendorId, actionType, path, device } = data;
      
      // Send real-time indicator to the active monitoring vendor dashboards
      analyticsNamespace.to(vendorId).emit('live_action_broadcast', {
        actionType,
        path,
        device,
        timestamp: new Date()
      });
      
      logger.debug(`Real-time traffic update: Vendor ${vendorId} captured '${actionType}' on path '${path}'`);
    });

    socket.on('disconnect', () => {
      logger.debug(`Analytics Monitor Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = registerAnalyticsSocket;
