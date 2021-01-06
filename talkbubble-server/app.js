const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const http = require("http");
const https = require("https");
const cors = require("cors");
const socketIo = require("socket.io");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const fetch = require('node-fetch');
const sanitizer = require('sanitizer');
const port = process.env.PORT || 4001;
const index = require("./routes/index");
const { MemoryStore } = require("express-session");


const privateKey  = fs.readFileSync('certificate/talkbubble.org.key', 'utf8');
const certificate = fs.readFileSync('certificate/talkbubble.org.crt', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const app = express();
app.use(index);
app.use(cors());
app.use(cookieParser());
app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
  cookie: { 
    secure: false,
  }
}));

const jsonParser = bodyParser.json();
const server = https.createServer(credentials, app);

const io = socketIo(server, {
  cors: {
    // origin: [
    //   'http://talkbubble.org',
    //   'https://talkbubble.org',
    //   'http://www.talkbubble.org',
    //   'https://www.talkbubble.org'
    // ],
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let interval;
const members = [];
let nextId = 1;

let topics = [];
let topicIndex;

const changeTopic = function() {
  topicIndex = (topicIndex + 1) % topics.length;
  io.emit('change topic', topics[topicIndex]);
}

fetch('https://www.reddit.com/r/showerthoughts/hot/.json?limit=20')
      .then( (response) => response.json() )
      .then( (data) => { 
        const posts = data.data.children;

        posts.forEach((post) => {
          if (!post.data.stickied) topics.push(post.data.title);
        });

        io.emit('change topic', topics[0]);
        topicIndex = 1;
        setInterval(changeTopic, 20000);
      });


function genId() {
  let idTemp;
  if (nextId < 100000) idTemp = 1000000 + nextId;
  else idTemp = nextId;
  const id = '#' + idTemp.toString().slice(1);

  nextId++;
  return id;
}

io.on("connection", (socket) => {
  console.log("New client connected");
  
  socket.on('join', function(callback) {
    const memberId = genId();
    socket.memberId = memberId;
    socket.nickname = '';
    members.push(socket);
    
    membersTemp = [];
    members.forEach((member) => {
      membersTemp.push({
        id: member.memberId,
        nickname: member.nickname,
      })
    });

    io.emit('new member', {
      id: memberId,
      nickname: '',
    });

    io.emit('change topic', topics[topicIndex]);
    callback(memberId, membersTemp);
  });

  socket.on('chat', (data) => {
    if (data.msg[0] === '#') {
      const recipientId = data.msg.match(/#[0-9]*(?=\s)/m)[0];
      data.msg = data.msg.replace(recipientId, '').trim();
      let recipient;
      for (let i = 0; i < members.length; i++) {
        if (members[i].memberId === recipientId) {
          recipient = members[i];
          break;
        }
      }
      data.direct = true;
      data.recipient = recipientId;
      io.to(recipient.id).emit('chat', data);
      io.to(socket.id).emit('chat', data);
    } else {
      io.emit('chat', data);
    }
  });

  socket.on('change nickname', (data) => {
    socket.nickname = data.nickname;
    io.emit('change nickname', {
      memberId: socket.memberId,
      nickname: data.nickname,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    let memberTemp;
    for (let i = 0; i < members.length; i++) {
      if (members[i].id === socket.id) {
        memberTemp = members[i];
        members.splice(i, 1);
        break;
      }
    }
    if (memberTemp) {
      io.emit('member left', memberTemp.memberId);
    }
  });
});

app.post('/api/chat', jsonParser, function(req, res) {
  io.emit('chat', req.body);
});

server.listen(port, () => console.log(`Listening on port ${port}`));
