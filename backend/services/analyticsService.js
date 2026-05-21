const Analytics = require('../models/Analytics');
const Product = require('../models/Product');
const Order = require('../models/Order');

class AnalyticsService {
  /**
   * Log a new client action event
   */
  static async recordEvent(eventData) {
    const { vendorId, eventType, pageUrl, visitorIp, userAgent, device, value, sessionId } = eventData;
    
    return await Analytics.create({
      vendorId,
      eventType,
      pageUrl,
      visitorIp,
      userAgent,
      device: device || 'desktop',
      value: value || 0,
      sessionId
    });
  }

  /**
   * Aggregate statistics dashboard for a vendor tenant
   */
  static async getVendorAnalytics(vendorId, periodDays = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(periodDays));

    // Aggregate pageview counts
    const pageviews = await Analytics.countDocuments({
      vendorId,
      eventType: 'pageview',
      createdAt: { $gte: startDate }
    });

    // Aggregate unique visitor sessions counts
    const uniqueSessions = await Analytics.distinct('sessionId', {
      vendorId,
      createdAt: { $gte: startDate }
    });
    const uniqueVisitors = uniqueSessions.length;

    // Aggregate e-commerce revenue sales details
    const salesAggregate = await Analytics.aggregate([
      {
        $match: {
          vendorId: new Object(vendorId),
          eventType: 'sale',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$value' },
          ordersCount: { $sum: 1 }
        }
      }
    ]);

    const revenue = salesAggregate.length > 0 ? salesAggregate[0].totalRevenue : 0;
    const salesCount = salesAggregate.length > 0 ? salesAggregate[0].ordersCount : 0;

    // Device split percentage calculations
    const deviceSplit = await Analytics.aggregate([
      {
        $match: {
          vendorId: new Object(vendorId),
          eventType: 'pageview',
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: '$device',
          count: { $sum: 1 }
        }
      }
    ]);

    // Conversion rate calculations (Total sales / Unique session visitors)
    const sessionCount = await Analytics.countDocuments({
      vendorId,
      eventType: 'session_start',
      createdAt: { $gte: startDate }
    });
    
    const conversionRate = sessionCount > 0 ? ((salesCount / sessionCount) * 100).toFixed(2) : 0;

    return {
      overview: {
        pageviews,
        uniqueVisitors,
        revenue,
        salesCount,
        conversionRate: parseFloat(conversionRate)
      },
      deviceSplit: deviceSplit.map(d => ({ device: d._id, count: d.count })),
      periodDays
    };
  }

  /**
   * System-wide platform health statistics for admins
   */
  static async getPlatformAnalytics() {
    const vendorsCount = await Order.distinct('vendorId');
    const totalSales = await Analytics.aggregate([
      {
        $match: { eventType: 'sale' }
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: '$value' }
        }
      }
    ]);

    const globalRevenue = totalSales.length > 0 ? totalSales[0].revenue : 0;

    return {
      activeTenants: vendorsCount.length,
      platformRevenue: globalRevenue,
      timestamp: new Date()
    };
  }
}

module.exports = AnalyticsService;
