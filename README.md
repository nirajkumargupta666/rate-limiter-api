# 📦 Rate Limiter API (Node.js + Redis + RabbitMQ)

A scalable rate-limiting middleware for an e-commerce Express.js API using Redis for tracking requests and RabbitMQ for logging excessive request patterns.

---

## ⚙️ Features

- IP-based or token-based request limiting
- Configurable rate limit (default: 100 requests per 15 minutes)
- Redis-based in-memory tracking
- RabbitMQ-based real-time logging of limit violations
- API routes to fetch:
  - Request counts from Redis
  - Excessive logs from Redis (via RabbitMQ consumer)
- Plain JS/HTML UI to test endpoints and visualize logs

How to run:
1. Start everything with Docker Compose:
   
    docker-compose up --build
   
3. Access services:
     API: http://localhost:3000
     RabbitMQ UI: http://localhost:15672 (default user/pass: guest/guest)
     Redis CLI: docker exec -it <redis_container> redis-cli

4. Open frontend/index.html in your browser:
   Frontend Features:
    -Simple UI to call API endpoints
    -Visualize rate limit data from Redis
    -View real-time excessive request logs
