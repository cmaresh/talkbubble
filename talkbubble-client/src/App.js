import popfile from './media/pop.wav';
import { Nav } from './components/nav';
import { Feed } from './components/feed';
import { Topic } from './components/topic';
import { Management } from './components/management';
import { Form } from './components/form';
import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import styled from 'styled-components';

const ENDPOINT = "http://127.0.0.1:4001";

const socket = socketIOClient(ENDPOINT, { secure: true });

window.nickname = '';

window.shift = false;
window.lastKey = '';

const ImageCC = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  color: var(--talkbubble-yellow);
  font-size: 14px;
  padding-left: 15px;
  opacity: 0.5;
  @media(max-width: 768px) {
    margin-bottom: 120px; 
    position: relative;
    z-index: -1;
    text-align: center;
  }
`

const MainRow = styled.div`
  background-color: var(--talkbubble-blue);
  box-shadow: var(--talkbubble-shadow);
  border-radius: 10px;
  margin: 15px;
  @media(max-width: 768px) {
    margin: 5px;
  }
`
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMember: '',
      members: [],
      msg: '',
      muteList: [],
      nickname: '',
      nicknameTemp: '',
      posts: [],
      topic: '',
      transitioningTopic: false,
      updatingNickname: false,
    }

    this.manageMember     = this.manageMember.bind(this);
    this.toggleMute       = this.toggleMute.bind(this);
    this.handleChange     = this.handleChange.bind(this);
    this.chat             = this.chat.bind(this);
    this.directMessage    = this.directMessage.bind(this);
    this.changeNickname   = this.changeNickname.bind(this);
    this.nicknameReject   = this.nicknameReject.bind(this);
    this.nicknameAccept   = this.nicknameAccept.bind(this);
    this.nicknameUpdate   = this.nicknameUpdate.bind(this);
    this.setFeedRef       = this.setFeedRef.bind(this);
  }

  setFeedRef(ref) {
    this.feedRef = ref;
  }

  manageMember(member) {
    if (member === this.state.activeMember) {
      this.setState({
        activeMember: '',
      })
    } else {
      this.setState({
        activeMember: member,
      });
    }
  }

  toggleMute() {
    let muted = false;
    const muteListClone = [...this.state.muteList];
    for (let i = 0; i < muteListClone.length; i) {
      if (muteListClone[i] === this.state.activeMember) {
        muteListClone.splice(i, 1);
        muted = true;
        break;
      }
    }

    if (!muted) muteListClone.push(this.state.activeMember);

    this.setState({muteList: muteListClone});
  }
  
  handleChange(e) {
    if (window.lastKey === 'Enter' && !window.shift) return;
    if (e.target.value.length <= 256) {
      this.setState({ msg: e.target.value });
    } else {
      this.setState({ msg: e.target.value.substring(0, 256) })
    }
  }

  changeNickname(e) {
    if (e.target.value.length <= 32) {
      this.setState({ nicknameTemp: e.target.value })
    } else {
      this.setState({ nicknameTemp: e.target.value.substring(0, 32) })
    }
    
  }

  nicknameUpdate() {
    this.setState({ 
      nicknameTemp: this.state.nickname,
      updatingNickname: true 
    });
  }

  nicknameAccept() {
    socket.emit('change nickname', { memberId: window.memberId, nickname: this.state.nicknameTemp})
    this.setState({ 
      nickname: this.state.nicknameTemp,
      updatingNickname: false 
    })
  }

  nicknameReject() {
    this.setState({
      updatingNickname: false
    })
  }
  chat() {
    if (this.state.msg.length < 1) return;
    socket.emit('chat', {
      msg: this.state.msg,
      member: window.memberId,
      nickname: window.nickname,
    })
    this.setState({ msg: '' });
  }

  directMessage() {
    let msg = this.state.msg;
    msg = this.state.activeMember + ' ' + msg;
    this.setState({ msg })
  }

  componentDidMount() {
    const _state = this.state;
    const pop = new Audio(popfile);

    socket.emit('join', (member, members) => {
      window.memberId = member;
      window.nickname = '';
      members.forEach((member) => {
        member.active = false;
      })
      this.setState({
        members: members,
      });
    });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css";
    document.head.appendChild(link);

    const gfonts = document.createElement('link');
    gfonts.rel = 'preconnect';
    gfonts.href = 'https://fonts.gstatic.com';
    document.head.appendChild(gfonts);

    const montserrat = document.createElement('link');
    montserrat.rel = 'stylesheet';
    montserrat.href = 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap';
    document.head.appendChild(montserrat);


    
    window.addEventListener('keydown', e => {
      if (e.repeat) return;
      if (e.key === "Shift") {
        window.shift = true;
      }
      window.lastKey = e.key;
      if (e.key === 'Enter' && !window.shift) {
        if (this.state.updatingNickname) {
          this.nicknameAccept();
        } else {
          this.chat();
        }
      }
    });

    window.addEventListener('keyup', e => {
      if (e.key === "Shift") {
        window.shift = false;
      }
    });
    
    const appendMember = (data) => {
      data.active = false;
      const membersClone = [...this.state.members];
      membersClone.push(data);
      this.setState({
        members: membersClone,
      })
    }

    const removeMember = (member) => {
      const membersClone = [...this.state.members];
      for (let i = 0; i < membersClone.length; i++) {
        if (membersClone[i].id === member) {
          membersClone.splice(i, 1);
          break;
        }
      }
      this.setState({
        members: membersClone,
      })
    }

    const appendChat = (data) => {
      let lockScroll = false;
      if (this.feedRef) lockScroll = this.feedRef.scrollHeight - this.feedRef.scrollTop === this.feedRef.clientHeight;
      const postsClone = [...this.state.posts];
      postsClone.push(data);
      this.setState({
        posts: postsClone,
      });
      if (this.feedRef && lockScroll) this.feedRef.scrollTop = this.feedRef.scrollHeight;
      pop.play();
    }

    const _this = this;
    const switchTopic = (topic) => {
      const newTopic = function(newTopic) {
        _this.setState({
          topic,
          transitioningTopic: false,
        })
      }
      this.setState({ transitioningTopic: true });
      setTimeout(newTopic, 1000);
    }

    const changeMemberNickname = (data) => {
      console.log(data);
      const membersClone = [...this.state.members];
      membersClone.forEach((member) => {
        if (member.id === data.memberId) {
          member.nickname = data.nickname;
        }
      });
      this.setState({ members: membersClone })
    }

    socket.on('chat', function(data){
      appendChat(data);
    });

    socket.on('new member', function(data){
      appendMember(data);
    });

    socket.on('member left', function(member) {
      removeMember(member);
    });

    socket.on('change topic', function(topic) {
      switchTopic(topic);
    });

    socket.on('change nickname', function(data) {
      changeMemberNickname(data);
    })
  }

  render() {
    return (
      <div>
        <Nav />
        <div className="container backdrop">
          <MainRow className="row">
            <div className="col-md-12">
              <Topic 
                  topic={this.state.topic}
                  transitioningTopic={this.state.transitioningTopic}
                />
            </div>
            <div className="col-md-7 order-md-2">
              <div className="column-content">
                <Feed 
                  muteList={this.state.muteList}
                  posts={this.state.posts}
                  members={this.state.members}
                  activeMember={this.state.activeMember}
                  setFeedRef={this.setFeedRef}
                />
                <Form 
                  msg={this.state.msg}
                  handleChange={this.handleChange}
                  onSubmit={this.chat}
                  nickname={this.state.nickname}
                  nicknameTemp={this.state.nicknameTemp}
                  changeNickname={this.changeNickname}
                  nicknameUpdate={this.nicknameUpdate}
                  nicknameAccept={this.nicknameAccept}
                  nicknameReject={this.nicknameReject}
                  updatingNickname={this.state.updatingNickname}
                />
              </div>
            </div>
            <div className="col-md-5 order-md-1 mgmt-col">
              <div className="column-content">
                <Management 
                  members={this.state.members}
                  manageMember={this.manageMember}
                  activeMember={this.state.activeMember}
                  toggleMute={this.toggleMute}
                  directMessage={this.directMessage}
                  muteList={this.state.muteList}
                />
              </div>
            </div>
            
          </MainRow>
        </div>
        <ImageCC className="image-CC">
          <a target="_blank" href="https://www.flickr.com/photos/35468147887@N01/14018311">“sea life”</a> by&nbsp;
          <a target="_blank" href="https://www.flickr.com/photos/hodgers/">Tom Hodgkinson</a> is licensed under&nbsp;
          <a target="_blank" href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0.</a> 
        </ImageCC>
        <script src="/socket.io/socket.io.js"></script>
      </div>
      );
  }
}

export default App;
