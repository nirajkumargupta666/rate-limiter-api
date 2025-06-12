const amqplib = require('amqplib');
const redis = require('./redisClient');

(async () => {
  try {
    const conn = await amqplib.connect('amqp://rabbitmq');
    const ch = await conn.createChannel();
    await ch.assertQueue('rate_limit_logs');

    console.log('RabbitMQ consumer listening for logs...');

    ch.consume('rate_limit_logs', async (msg) => {
      if (msg !== null) {
        const log = msg.content.toString();
        console.log('Received log:', log);

        // Push log to Redis list
        await redis.lpush('rate_limit_logs', log);

        // Trim list to last 100 logs
        await redis.ltrim('rate_limit_logs', 0, 99);

        ch.ack(msg);
      }
    });
  } catch (err) {
    console.error('RabbitMQ consumer error:', err);
  }
})();
