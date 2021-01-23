const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require("morgan");

global.Task = require('./api/models/taskModel');
global.User = require('./api/models/User');
const routes = require('./api/routes/taskRoutes');

// connect database
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);
mongoose.connect(
  'mongodb://localhost/Vuecrudapp',
  { useNewUrlParser: true }
);


const port = process.env.PORT || 3000;
const app = express();

// configire morgan
app.use(morgan("dev"));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// listener to app via port
routes(app);
app.listen(port);

app.use((req, res) => {
  res.status(404).send({ url: `${req.originalUrl} not found` });
});

console.log(`Server started on port ${port}`);
