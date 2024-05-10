const allowedOrigins = [
  'http://10.121.213.24',
  'http://10.121.213.24:4200',
  'http://localhost',
  'http://localhost:4200'
]

// Set up CORS middleware with allow list
const corsConfig = {
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  };

  module.exports = corsConfig;