const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

const http = require('http'),
    redis = require('redis');

const redisClient = redis
    .createClient({host: REDIS_HOST, password: REDIS_PASSWORD})
    .on('connect', () => {
        console.log('Redis connection - OK');
    });

http.createServer( (request, response) => {
    if (request.url === '/') {
        redisClient.get('last_timestamp', (err, result) => {
            response.end('All good! Last request was logged at: ' + result);
            redisClient.set('last_timestamp', Date.now(), redis.print);
        });
    } else {
        response.end('Invalid URL.');
    }
}).listen(3000);
