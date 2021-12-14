const express = require("express");
const fs = require('fs');
const http = require("http");
const https = require("https");
const cors = require("cors");
const socketIo = require("socket.io");
const fetch = require('node-fetch');
const port = process.env.PORT || 4001;
const filter = require("profanity-filter");
const dotenv = require("dotenv");

const MAX_POST_LENGTH = 256;
const MAX_NICKNAME_LENGTH = 32;
const TOPIC_INTERVAL = 40000;

dotenv.config({ path: './env/process.env' });

let privateKey;
let certificate;
let credentials;

if (process.env.ENV === 'PROD') {
  privateKey  = fs.readFileSync(process.env.KEY_PATH, 'utf8');
  certificate = fs.readFileSync(process.env.CERT_PATH, 'utf8');
  credentials = { key: privateKey, cert: certificate };
}

filter.seed('profanity');
const app = express();
app.use(cors());


let server;
if (process.env.ENV === 'PROD') {
  server = https.createServer(credentials, app);
} else {
  server = http.createServer(app);
}

let origin;
if (process.env.env === 'PROD') {
  origin = [
      'http://talkbubble.org',
      'https://talkbubble.org',
      'http://www.talkbubble.org',
      'https://www.talkbubble.org'
    ];
} else {
  origin = '*';
}

const io = socketIo(server, {
  cors: {
    origin,
    methods: ['GET', 'POST']
  }
});

let interval;
let members = [];
let nextId = 1;

let topics = [];
let topicIndex;

const changeTopic = function() {
  topicIndex = (topicIndex + 1) % topics.length;
  io.emit('change topic', topics[topicIndex]);
}

fetch('https://www.reddit.com/r/askreddit/hot.json')
      .then( (response) => response.json() )
      .then( (data) => { 
        const posts = data.data.children;

        posts.forEach((post) => {
          if (
            !post.data.stickied &&
            !post.data.over_18
            ) topics.push(post.data.title);
        });

        io.emit('change topic', topics[0]);
        topicIndex = 1;
        setInterval(changeTopic, TOPIC_INTERVAL);
      });


function getDefaultNickname() {
  let idTemp;
  let id;
  if (nextId < 100000) {
    idTemp = 1000000 + nextId;
    id = '#' + idTemp.toString().slice(1);
  }
  else {
    id = '#' + nextId.toString();
  }

  nextId++;
  return id;
}

io.on("connection", (socket) => {  
  socket.on('join', function(callback) {
    socket.nickname = getDefaultNickname();
    members.push(socket);

    io.emit('new member', {
      id: socket.id,
      nickname: socket.nickname,
      active: false,
    });

    io.to(socket.id).emit('change topic', topics[topicIndex]);

    const user = {
      id: socket.id,
      nickname: socket.nickname,
    }
    callback(user, members.map(member => {
      return { 
        id: member.id, 
        nickname: member.nickname 
      }
    }));
  });

  socket.on('chat', (data) => {
    if (data.msg.length > MAX_POST_LENGTH) return;
    if (data.recipient) {
      data.msg = filter.clean(data.msg);
      data.direct = true;
      io.to(data.recipient.id).emit('chat', data);
      if (data.recipient.id !== socket.id) io.to(socket.id).emit('chat', data);
    } else {
      data.msg = filter.clean(data.msg);
      io.emit('chat', data);
    }
  });

  socket.on('change nickname', (data) => {
    if (data.nickname.length > MAX_NICKNAME_LENGTH) return;
    socket.nickname = data.nickname;
    io.emit('change nickname', {
      id: socket.id,
      nickname: data.nickname,
    });
  });

  socket.on("disconnect", () => {
    let memberTemp;
    for (let i = 0; i < members.length; i++) {
      if (members[i].id === socket.id) {
        memberTemp = members[i];
        members.splice(i, 1);
        break;
      }
    }
    if (memberTemp) {
      io.emit('member left', memberTemp.id);
    }
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));
