const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

// DOTENV Config
dotenv.config({path: '../.env'});

// Express Config
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Sec-Fetch-Mode");
    next(); 
  });

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
});



connectDB();

 
// Routes for API
app.use('/api', require('./routes/index'));

// Start Server
app.get('/', (req, res) => {
    res.send("Easy Poll API running");
})

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`\nServer port: ${PORT}`.bold.white));