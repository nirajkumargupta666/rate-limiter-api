const express = require('express');
const router = express.Router();
const redis = require('./services/redisClient');


router.get('/products', (req, res) => {
  res.json({ message: 'Products list' });
});

router.get('/checkout', (req, res) => {
  res.json({ message: 'Checkout endpoint' });
});



// GET /admin/rate-limits
router.get('/rate-limits', async (req, res) => {
  const keys = await redis.keys('rl:*');
  const results = {};
  for (const key of keys) {
    const count = await redis.get(key);
    results[key] = count;
  }
  res.json(results);
});

// GET /admin/excessive-logs
router.get('/excessive-logs', async (req, res) => {
  const logs = await redis.lrange('rate_limit_logs', 0, 50);
  res.json(logs.map(log => JSON.parse(log)));
});


module.exports = router;