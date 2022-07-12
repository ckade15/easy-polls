const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path')
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');

// DOTENV Config
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

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


/* Socket.io for handling poll voting */
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        autoconnect: false
    } 
});

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.broadcast.emit('user connected', {
        userId: socket.id
    });

    socket.on('createPoll', (poll) => {
        const poll = poll;
        

    })

    socket.on('joinPoll', (pollId, userId) => {

    });

    socket.on('vote', (pollId, index, ipAddr) => {

    });
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('error', (err) => {
        console.log(err);
    });
});


connectDB();

 
// Routes for API
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/poll', require('./routes/poll.routes'));

// Start Server
app.get('/', (req, res) => {
    res.send("Easy Poll API running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, console.log(`\nServer listening on port ${PORT}`));