const express = require('express');
const app = express(); 
const bodyParser = require('body-parser');
const routes = require('./routes/routes')
const PATH = 3001; 

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// **************************************************************************** //
//                    Gets Around CORS ISSUE                                    // 
//            Will be unneccesary once we serve the build file                  // 

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('preflightContinue', 'false');
  next();
})

app.use('/api', routes);

app.listen(PATH, () => {
  console.log(`listening on port ${PATH}`);
})