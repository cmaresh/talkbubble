import { Nav } from './components/nav';
import { Feed } from './components/feed';
import { Topic } from './components/topic';
import { Management } from './components/management';
import { Form } from './components/form';
import { SocketIO } from './classes/socketio';
import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';

const ImageCC = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  color: var(--talkbubble-yellow);
  font-size: 14px;
  padding-left: 15px;
  opacity: 0.5;
  @media(max-width: 768px) {
    margin-top: 20px; 
    margin-bottom: 20px;
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
export function App(props) {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeMember, setActiveMember] = useState();
  const [location, setLocation] = useState('feed');
  const [muteList, setMuteList] = useState([]);
  const [topic, setTopic] = useState();
  const [transitioningTopic, setTransitioningTopic] = useState();
  const [recipient, setRecipient] = useState('');
  const [socketio, setSocketio] = useState();

  const socketioProps = {
    user, setUser, posts, setPosts, members, setMembers, setTopic, setTransitioningTopic
  }

  useEffect(() => {
    setSocketio(new SocketIO(socketioProps));
  }, []);

  useEffect(() => {
    if (socketio) socketio.updateProps(socketioProps);
  }, [posts, members]);

  function directMessage() {
    setRecipient(activeMember);
  }

  function manageMember(member) {
    if (member === activeMember) setActiveMember('');
    else setActiveMember(member);
  }

  function toggleMute() {
    console.log(muteList);
    const muted = muteList.includes(activeMember);
    if (muted) setMuteList([...muteList.filter(id => id !== activeMember)]);
    else setMuteList([...muteList, activeMember]);
  }

  return (
    <div>
      <Nav location={location} setLocation={setLocation} />
      <div className="container backdrop">
        <MainRow className="row">
          <div className="col-md-12">
            <Topic 
                topic={topic}
                transitioningTopic={transitioningTopic}
              />
          </div>
          <div className={"col-md-7 order-md-2 feed-col " + (location === 'feed' ? 'active' : '')}>
            <div className="column-content">
              <Feed 
                muteList={muteList}
                members={members}
                posts={posts}
                activeMember={activeMember}
                socketio={socketio}
              />
              <Form
                recipient={recipient}
                socketio={socketio}
                user={user}
              />
            </div>
          </div>
          <div className={"col-md-5 order-md-1 mgmt-col " + (location === 'mgmt' ? 'active' : '')}>
            <div className="column-content">
              <Management 
                members={members}
                manageMember={manageMember}
                activeMember={activeMember}
                toggleMute={toggleMute}
                directMessage={directMessage}
                muteList={muteList}
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
    </div>
    );
  
}

export default App;
