const NotificationService = require('../services/notificationService');
const ApiResponse = require('../utils/apiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Fetch all alert items logged under logged-in session user
 */
const getNotifications = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const notifications = await NotificationService.getNotificationsByUser(userId);
  ApiResponse.success(res, 'Notifications loaded successfully', notifications);
});

/**
 * Dismiss single notification alert flag
 */
const markAsRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const notification = await NotificationService.markAsRead(id);
  ApiResponse.success(res, 'Notification marked as read successfully', notification);
});

module.exports = {
  getNotifications,
  markAsRead
};
