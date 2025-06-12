const redis = require('../services/redisClient');
const publishLog = require('../services/mqPublisher');

const RATE_LIMIT = 100;
const WINDOW_SIZE = 15 * 60; // 15 minutes in seconds

module.exports = async (req, res, next) => {
  try {
    const userKey = req.ip || req.headers['x-api-key'];
    const redisKey = `rl:${userKey}`;

    const requests = await redis.incr(redisKey);

    if (requests === 1) {
      await redis.expire(redisKey, WINDOW_SIZE);
    }

    if (requests > RATE_LIMIT) {
      await publishLog({ user: userKey, time: new Date(), type: 'RATE_LIMIT_EXCEEDED' });
      return res.status(429).json({ message: 'Too Many Requests. Please try again later.' });
    }

    next();
  } catch (err) {
    console.error('Rate limiter error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
