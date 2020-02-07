const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const helmet = require('helmet')
const PORT = 3001; 

app.use(helmet());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/**
 * Set CORS headers to allow acess from React client app (weather-client)
 */
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('preflightContinue', 'false');
  next();
})

app.use('/api', routes);

/**
 * Listening on port 3001
 */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})