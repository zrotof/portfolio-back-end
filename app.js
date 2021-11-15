const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
var bodyParser = require('body-parser')// importing body parser middleware to parse form content from HTML

const cors = require("./cors");
const app = express();
app.use(bodyParser.json());


app.use('/mail', require('./routes/emailRoutes'));

//How tolisten to the server
const port = process.env.PORT || 3000
app.listen(port, '0.0.0.0', ()=>console.log(`Listening on port : ${port} ...`));