module.exports = {
  ROLES: {
    ADMIN: 'admin',
    VENDOR: 'vendor',
    CUSTOMER: 'customer'
  },
  
  PLANS: {
    FREE: 'free',
    BASIC: 'basic',
    PREMIUM: 'premium',
    ENTERPRISE: 'enterprise'
  },

  TEMPLATE_CATEGORIES: [
    'bakery',
    'beauty',
    'electronics',
    'fashion',
    'grocery',
    'restaurant',
    'portfolio',
    'corporate',
    'fitness'
  ],

  PAYMENT_STATUS: {
    PENDING: 'pending',
    SUCCESS: 'success',
    FAILED: 'failed',
    REFUNDED: 'refunded'
  },

  ORDER_STATUS: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled'
  },

  AI_GENERATOR_LIMITS: {
    free: 5,
    basic: 30,
    premium: 100,
    enterprise: 10000
  }
};
