// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// Create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5001;
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// Parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(cors());
// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// Connecting to the database
mongoose
  .connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
  });
// define a root/default route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the blog application' });
});
// Require Comments routes
require('./app/routes/comment.routes.js')(app);
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
