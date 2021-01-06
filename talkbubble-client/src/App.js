import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';

const ENDPOINT = "https://www.talkbubble.org:4001";
//const ENDPOINT = "http://127.0.0.1:4001";

const socket = socketIOClient(ENDPOINT, { secure: true });

window.nickname = '';

class Nav extends React.Component {
  render() {
    return (
    <div className="nav">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-center">
          <svg width="100" height="36" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="100" height="25" rx="12.5" fill="#EDE599"/>
          <path d="M25 25L33.25 15.4737V34.5263L25 25Z" fill="#EDE599"/>
          <path d="M11.192 10.048H8.056V8.2H16.596V10.048H13.46V18H11.192V10.048ZM20.7375 10.356C21.9042 10.356 22.8002 10.636 23.4255 11.196C24.0508 11.7467 24.3635 12.582 24.3635 13.702V18H22.3195V17.062C21.9088 17.762 21.1435 18.112 20.0235 18.112C19.4448 18.112 18.9408 18.014 18.5115 17.818C18.0915 17.622 17.7695 17.3513 17.5455 17.006C17.3215 16.6607 17.2095 16.2687 17.2095 15.83C17.2095 15.13 17.4708 14.5793 17.9935 14.178C18.5255 13.7767 19.3422 13.576 20.4435 13.576H22.1795C22.1795 13.1 22.0348 12.736 21.7455 12.484C21.4562 12.2227 21.0222 12.092 20.4435 12.092C20.0422 12.092 19.6455 12.1573 19.2535 12.288C18.8708 12.4093 18.5442 12.5773 18.2735 12.792L17.4895 11.266C17.9002 10.9767 18.3902 10.7527 18.9595 10.594C19.5382 10.4353 20.1308 10.356 20.7375 10.356ZM20.5695 16.642C20.9428 16.642 21.2742 16.558 21.5635 16.39C21.8528 16.2127 22.0582 15.956 22.1795 15.62V14.85H20.6815C19.7855 14.85 19.3375 15.144 19.3375 15.732C19.3375 16.012 19.4448 16.236 19.6595 16.404C19.8835 16.5627 20.1868 16.642 20.5695 16.642ZM26.7601 7.612H28.9441V18H26.7601V7.612ZM34.625 15.046L33.575 16.082V18H31.391V7.612H33.575V13.492L36.767 10.468H39.371L36.235 13.66L39.651 18H37.005L34.625 15.046ZM45.2252 10.58C45.9159 10.58 46.5412 10.7387 47.1012 11.056C47.6612 11.364 48.0999 11.8027 48.4172 12.372C48.7346 12.9413 48.8932 13.59 48.8932 14.318C48.8932 15.046 48.7346 15.6947 48.4172 16.264C48.0999 16.8333 47.6612 17.2767 47.1012 17.594C46.5412 17.9113 45.9159 18.07 45.2252 18.07C44.6092 18.07 44.0539 17.9393 43.5592 17.678C43.0739 17.4167 42.6819 17.0387 42.3832 16.544V18H41.4312V7.612H42.4252V12.036C42.7332 11.56 43.1252 11.2007 43.6012 10.958C44.0866 10.706 44.6279 10.58 45.2252 10.58ZM45.1552 17.188C45.6686 17.188 46.1352 17.0713 46.5552 16.838C46.9752 16.5953 47.3019 16.2547 47.5352 15.816C47.7779 15.3773 47.8992 14.878 47.8992 14.318C47.8992 13.758 47.7779 13.2587 47.5352 12.82C47.3019 12.3813 46.9752 12.0453 46.5552 11.812C46.1352 11.5693 45.6686 11.448 45.1552 11.448C44.6326 11.448 44.1612 11.5693 43.7412 11.812C43.3306 12.0453 43.0039 12.3813 42.7612 12.82C42.5279 13.2587 42.4112 13.758 42.4112 14.318C42.4112 14.878 42.5279 15.3773 42.7612 15.816C43.0039 16.2547 43.3306 16.5953 43.7412 16.838C44.1612 17.0713 44.6326 17.188 45.1552 17.188ZM57.9755 10.636V18H57.0235V16.656C56.7622 17.104 56.4028 17.454 55.9455 17.706C55.4882 17.9487 54.9655 18.07 54.3775 18.07C53.4162 18.07 52.6555 17.804 52.0955 17.272C51.5448 16.7307 51.2695 15.942 51.2695 14.906V10.636H52.2635V14.808C52.2635 15.5827 52.4548 16.1707 52.8375 16.572C53.2202 16.9733 53.7662 17.174 54.4755 17.174C55.2502 17.174 55.8615 16.9407 56.3095 16.474C56.7575 15.998 56.9815 15.34 56.9815 14.5V10.636H57.9755ZM64.9734 10.58C65.6641 10.58 66.2894 10.7387 66.8494 11.056C67.4094 11.364 67.8481 11.8027 68.1654 12.372C68.4828 12.9413 68.6414 13.59 68.6414 14.318C68.6414 15.046 68.4828 15.6947 68.1654 16.264C67.8481 16.8333 67.4094 17.2767 66.8494 17.594C66.2894 17.9113 65.6641 18.07 64.9734 18.07C64.3574 18.07 63.8021 17.9393 63.3074 17.678C62.8221 17.4167 62.4301 17.0387 62.1314 16.544V18H61.1794V7.612H62.1734V12.036C62.4814 11.56 62.8734 11.2007 63.3494 10.958C63.8348 10.706 64.3761 10.58 64.9734 10.58ZM64.9034 17.188C65.4168 17.188 65.8834 17.0713 66.3034 16.838C66.7234 16.5953 67.0501 16.2547 67.2834 15.816C67.5261 15.3773 67.6474 14.878 67.6474 14.318C67.6474 13.758 67.5261 13.2587 67.2834 12.82C67.0501 12.3813 66.7234 12.0453 66.3034 11.812C65.8834 11.5693 65.4168 11.448 64.9034 11.448C64.3808 11.448 63.9094 11.5693 63.4894 11.812C63.0788 12.0453 62.7521 12.3813 62.5094 12.82C62.2761 13.2587 62.1594 13.758 62.1594 14.318C62.1594 14.878 62.2761 15.3773 62.5094 15.816C62.7521 16.2547 63.0788 16.5953 63.4894 16.838C63.9094 17.0713 64.3808 17.188 64.9034 17.188ZM74.8817 10.58C75.5724 10.58 76.1977 10.7387 76.7577 11.056C77.3177 11.364 77.7564 11.8027 78.0737 12.372C78.3911 12.9413 78.5497 13.59 78.5497 14.318C78.5497 15.046 78.3911 15.6947 78.0737 16.264C77.7564 16.8333 77.3177 17.2767 76.7577 17.594C76.1977 17.9113 75.5724 18.07 74.8817 18.07C74.2657 18.07 73.7104 17.9393 73.2157 17.678C72.7304 17.4167 72.3384 17.0387 72.0397 16.544V18H71.0877V7.612H72.0817V12.036C72.3897 11.56 72.7817 11.2007 73.2577 10.958C73.7431 10.706 74.2844 10.58 74.8817 10.58ZM74.8117 17.188C75.3251 17.188 75.7917 17.0713 76.2117 16.838C76.6317 16.5953 76.9584 16.2547 77.1917 15.816C77.4344 15.3773 77.5557 14.878 77.5557 14.318C77.5557 13.758 77.4344 13.2587 77.1917 12.82C76.9584 12.3813 76.6317 12.0453 76.2117 11.812C75.7917 11.5693 75.3251 11.448 74.8117 11.448C74.2891 11.448 73.8177 11.5693 73.3977 11.812C72.9871 12.0453 72.6604 12.3813 72.4177 12.82C72.1844 13.2587 72.0677 13.758 72.0677 14.318C72.0677 14.878 72.1844 15.3773 72.4177 15.816C72.6604 16.2547 72.9871 16.5953 73.3977 16.838C73.8177 17.0713 74.2891 17.188 74.8117 17.188ZM80.996 7.612H81.99V18H80.996V7.612ZM91.5878 14.626H85.4278C85.4838 15.3913 85.7778 16.012 86.3098 16.488C86.8418 16.9547 87.5138 17.188 88.3258 17.188C88.7831 17.188 89.2031 17.1087 89.5858 16.95C89.9684 16.782 90.2998 16.5393 90.5798 16.222L91.1398 16.866C90.8131 17.258 90.4024 17.5567 89.9078 17.762C89.4224 17.9673 88.8858 18.07 88.2978 18.07C87.5418 18.07 86.8698 17.9113 86.2818 17.594C85.7031 17.2673 85.2504 16.8193 84.9238 16.25C84.5971 15.6807 84.4338 15.0367 84.4338 14.318C84.4338 13.5993 84.5878 12.9553 84.8958 12.386C85.2131 11.8167 85.6424 11.3733 86.1838 11.056C86.7344 10.7387 87.3504 10.58 88.0318 10.58C88.7131 10.58 89.3244 10.7387 89.8658 11.056C90.4071 11.3733 90.8318 11.8167 91.1398 12.386C91.4478 12.946 91.6018 13.59 91.6018 14.318L91.5878 14.626ZM88.0318 11.434C87.3224 11.434 86.7251 11.6627 86.2398 12.12C85.7638 12.568 85.4931 13.156 85.4278 13.884H90.6498C90.5844 13.156 90.3091 12.568 89.8238 12.12C89.3478 11.6627 88.7504 11.434 88.0318 11.434Z" fill="black"/>
          </svg>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

class Post extends React.Component {

  directText() {
    if (!this.props.post.recipient) return '';
    else if (this.props.post.recipient === window.memberId) return '@ You';
    else return '@ ' + this.props.post.recipient;
  }

  msgClass() {
    if (!this.props.post.recipient) return '';
    else if (this.props.post.recipient === window.memberId) return 'receiving';
    else return 'sending';
  }

  getNickname() {
    if (!this.props.member) return '';
    else if (this.props.member.nickname) return '(' + this.props.member.nickname + ')';
    else return '';
  }
  render() {
    return(
      <div className={"post " + 
        (this.props.activeMember && this.props.post.member !== this.props.activeMember ? 'inactive ' : ' ') +
        (this.msgClass())
      }>
        <div className="msg">
          <b>
          {this.props.post.member}
          {this.getNickname()}&nbsp;
          {this.directText()}<br></br>
          </b>
          {this.props.post.msg}
        </div>
      </div>
    );
  }
}

class Feed extends React.Component {
  render() {
    const final = [];
    for (let i = 0; i < this.props.posts.length; i++) {
      let member;
     for (let j = 0; j < this.props.members.length; j++) {
       if (this.props.posts[i].member === this.props.members[j].id) {
         member = this.props.members[j];
       }
     }
      let post = this.props.posts[i];
      if (!this.props.muteList.includes(post.member)) {
        final.push(<Post 
          activeMember={this.props.activeMember} 
          key={i} 
          post={post}
          member={member}
        />)
      }
    }
    return (
      <div className="feed" ref={this.props.setFeedRef}>
        {final}
      </div>
    );
  }
}

class Topic extends React.Component {
  render() {
    return(
      <div className="topic">
        <h5>Topic:</h5>
        <div className={"topic-content "}>
          <div className={"topic-text " + (this.props.transitioningTopic ? 'transitioning' : '')}> {this.props.topic}</div>
        </div>
      </div>
    )
  }
}

class Options extends React.Component {
  render() {
    return (
      <div className="options">
        <div 
          className={"option mute " + (this.props.activeMember ? 'active' : '')} 
          onClick={this.props.toggleMute}
        >Mute This User</div>
        <div 
          className={"option dm " + (this.props.activeMember ? 'active' : '')} 
          onClick={this.props.directMessage}
        >Message This User</div>
      </div>
    );
  }
}

class Member extends React.Component {
  constructor(props){
    super(props);

    this.selectMember = this.selectMember.bind(this);
  }

  selectMember() {
    this.props.manageMember(this.props.member);
  }

  getNickname() {
    if (this.props.nickname) return '(' + this.props.nickname + ')';
    else return '';
  }
  render() {
    return (
    <h3 
      onClick={this.selectMember}
      className={(this.props.activeMember === this.props.member ? 'active' : '')}
    >
      {this.props.member} {this.getNickname()}
    </h3>)
    ;
  }
}

class Room extends React.Component {
  render() {
    return (
      <div className="room">
        <div className="header">
          Active Users
        </div>
        <div className="member-list">
        {
          this.props.members.map((member, index) =>
            <Member 
              key={index} 
              member={member.id} 
              nickname={member.nickname}
              manageMember={this.props.manageMember}
              activeMember={this.props.activeMember}
            />
          )
        }
        </div>
      </div>
    );
  }
}

class Management extends React.Component {
  render() {
    return (
      <div className="row flex-one">
        <div className="col-md-6">
          <Room 
            members={this.props.members}
            manageMember={this.props.manageMember}
            activeMember={this.props.activeMember}
          />
        </div>
        <div className="col-md-6">
          <Options 
            activeMember={this.props.activeMember}
            toggleMute={this.props.toggleMute}
            directMessage={this.props.directMessage}
          />
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props){
    super(props);

    this.getAlias = this.getAlias.bind(this);
  }

  getAlias() {
    if (this.props.updatingNickname) {
      return this.props.nicknameTemp;
    }
    else if (this.props.nickname) {
      return this.props.nickname;
    }
    else {
      return window.memberId;
    }
  }

  render() {
    return (
      <form id="postform" action="javascript:void(0)" onSubmit={this.props.onSubmit}>
        <textarea id="postform-textarea" form="postform" value={this.props.msg} onChange={this.props.handleChange} name="content" placeholder="Add to the Conversation">{this.props.msg}</textarea>
        <div className="below-textarea">
          <div className={"nickname-option accept " + (this.props.updatingNickname ? 'active' : '')} onClick={this.props.nicknameAccept}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>
          </div>
          <div className={"nickname-option reject " + (this.props.updatingNickname ? 'active' : '')} onClick={this.props.nicknameReject}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
          </div>
          <div className="posting-as">Posting as: 
            <input type="text" value={this.getAlias()} onChange={this.props.changeNickname} onClick={this.props.nicknameUpdate} />
          </div>
          <input type="submit" value="Post"></input>
        </div>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      activeMember: '',
      muteList: [],
      posts: [],
      topic: '',
      transitioningTopic: false,
      msg: '',
      nickname: '',
      nicknameTemp: '',
      updatingNickname: false,
    }

    this.manageMember = this.manageMember.bind(this);
    this.toggleMute = this.toggleMute.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.chat = this.chat.bind(this);
    this.directMessage = this.directMessage.bind(this);
    this.changeNickname = this.changeNickname.bind(this);
    this.nicknameReject = this.nicknameReject.bind(this);
    this.nicknameAccept = this.nicknameAccept.bind(this);
    this.nicknameUpdate = this.nicknameUpdate.bind(this);
    this.setFeedRef = this.setFeedRef.bind(this);
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
    this.setState({ msg: e.target.value });
  }

  changeNickname(e) {
    this.setState({ nicknameTemp: e.target.value })
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

    //document.body.style = 'background: #151F1E;font-family: "Montserrat";';

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
          <div className="row">
            <div className="col-md-6 order-md-12">
              <div className="column-content">
                <Topic 
                  topic={this.state.topic}
                  transitioningTopic={this.state.transitioningTopic}
                />
                <Feed 
                  muteList={this.state.muteList}
                  posts={this.state.posts}
                  members={this.state.members}
                  activeMember={this.state.activeMember}
                  setFeedRef={this.setFeedRef}
                />
              </div>
            </div>
            <div className="col-md-6 order-md-1">
              <div className="column-content">
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
                <Management 
                  members={this.state.members}
                  manageMember={this.manageMember}
                  activeMember={this.state.activeMember}
                  toggleMute={this.toggleMute}
                  directMessage={this.directMessage}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="image-CC">
          <a href="https://www.flickr.com/photos/35468147887@N01/14018311">“sea life”</a> by&nbsp;
          <a href="https://www.flickr.com/photos/hodgers/">Tom Hodgkinson</a> is licensed under&nbsp;
          <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC BY-SA 2.0.</a> 
        </div>
        <script src="/socket.io/socket.io.js"></script>
      </div>
      );
  }
}

export default App;
