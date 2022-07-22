const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
const dotenv = require('dotenv');
const path = require('path')
const { Server } = require('socket.io');
const cors = require('cors');
const connectDB = require('./config/db');
const { joinPoll, leavePoll, getCurrentUser, getPollUsers, vote, getPoll, checkVoted } = require('./utils/polls');

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

io.on('connection', async (socket) => {
    console.log('a user connected');
    socket.emit('m', 'Message to client')

    socket.broadcast.emit('user connected', {
        userId: socket.id
    });

    socket.on('joinPoll', ( pollId, userId ) => {
        console.log('join attempt')
        console.log(userId, pollId)
        try{
            
            const user = joinPoll(userId, pollId)
            socket.join(pollId)

            //console.log(userId, pollId)
            socket.emit('message', 'Welcome to poll');
    
            // Broadcast to others when users connects
            socket.broadcast
                .to(pollId)
                .emit('message', `${userId} has joined the poll room.`);
    
            // Send users and poll info
            const p = getPoll(pollId)
            const voted = checkVoted(pollId, userId);


            p.then(poll => {
                console.log()
            
                if (voted === true){
                    console.log('voted already')
                    io.to(pollId).emit('join', {
                        poll: poll,
                        voted: true
                    })
                }else{
                    console.log('didnt vote')
                    io.to(pollId).emit('join', {
                        poll: poll,
                        voted: false
                    })

                }
            })

            
        }catch(e){
            console.log(e)
        }
    });
    // Listen for poll votes
    socket.on('vote', (pollId) => {
        const user = vote(pollId);
        console.log('Vote attempt')
        const p = getPoll(pollId)
        p.then(poll => {
            console.log(poll)

            io.emit('roomUsers', {poll: poll});            
        })
    });

    // Check if user voted
    socket.on('checkVoted', (pollId, userId) => {
        const voted = checkVoted(pollId, userId);
        if (voted){
            io.emit('voteStatus', true)
        }else{
            io.emit('voteStatus', false)
        }
    })
     
    socket.on('disconnect', () => {
        const user = leavePoll(socket.id);
        if (user){
            io.to(user.pollId).emit('message', `${user.id} has left the poll room.`);
            
            // Sends users and room info
            io.to(user.pollId).emit('roomUsers', {
                pollId: user.pollId,
                users: getPollUsers(user.pollId)
            })

        }  
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

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`)); 
//app.listen(PORT, console.log(`\nServer listening on port ${PORT}`));