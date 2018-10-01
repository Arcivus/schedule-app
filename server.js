const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const routes = require('./server/api');


app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

routes(router);

app.listen(process.env.PORT || 8080);
console.log("Server is running at port " + (process.env.PORT || 8080));