const Notification = require('../models/Notification');
const socketConfig = require('../config/socket');
const logger = require('../utils/logger');

class NotificationService {
  /**
   * Create an in-app dashboard alert and broadcast it in real-time
   */
  static async sendNotification(notificationData) {
    const { userId, vendorId, title, message, type, link } = notificationData;

    const notification = await Notification.create({
      userId,
      vendorId,
      title,
      message,
      type: type || 'info',
      link
    });

    try {
      // Broadcast live to connection stream if connected
      const io = socketConfig.getIO();
      
      // Emit to user channel room
      io.to(userId.toString()).emit('new_notification', {
        id: notification._id,
        title,
        message,
        type: notification.type,
        link,
        createdAt: notification.createdAt
      });
      
      logger.debug(`Broadcasted Socket notification to channel room: ${userId}`);
    } catch (error) {
      logger.debug(`Socket.io not active or initialized, notification logged locally in DB only: ${error.message}`);
    }

    return notification;
  }

  /**
   * Fetch unread vendor/user notifications
   */
  static async getNotificationsByUser(userId) {
    return await Notification.find({ userId }).sort({ createdAt: -1 }).limit(50);
  }

  /**
   * Clear notifications indicator flags
   */
  static async markAsRead(notificationId) {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );
  }
}

module.exports = NotificationService;
