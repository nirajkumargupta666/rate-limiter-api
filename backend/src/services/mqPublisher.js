const amqplib = require('amqplib');

let channel;

(async () => {
  const connection = await amqplib.connect('amqp://rabbitmq');
  channel = await connection.createChannel();
  await channel.assertQueue('rate_limit_logs');
})();

const publishLog = async (log) => {
  if (channel) {
    channel.sendToQueue('rate_limit_logs', Buffer.from(JSON.stringify(log)));
  }
};

module.exports = publishLog;
