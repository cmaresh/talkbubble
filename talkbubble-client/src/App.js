import { Nav } from './components/nav';
import { Feed } from './components/feed';
import { Topic } from './components/topic';
import { Management } from './components/management';
import { Form } from './components/form';
import { ImageCC } from './components/imagecc';
import { SocketIO } from './classes/socketio';
import React, { useState, useEffect } from 'react';
import './App.css';
import styled from 'styled-components';


const MainRow = styled.div`
  background-color: var(--talkbubble-blue);
  box-shadow: var(--talkbubble-shadow);
  border-radius: 10px;
  margin: 15px;
  @media(max-width: 768px) {
    margin: 5px;
  }
`

export function App() {

  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const [members, setMembers] = useState([]);
  const [activeMember, setActiveMember] = useState({});
  const [location, setLocation] = useState('feed');
  const [muteList, setMuteList] = useState([]);
  const [topic, setTopic] = useState();
  const [transitioningTopic, setTransitioningTopic] = useState();
  const [recipient, setRecipient] = useState({});
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
    if (member.id === activeMember.id) setActiveMember('');
    else setActiveMember(member);
  }

  function toggleMute() {
    const muted = muteList.includes(activeMember.id);
    if (muted) setMuteList([...muteList.filter(id => id !== activeMember.id)]);
    else setMuteList([...muteList, activeMember.id]);
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
                user={user}
              />
              <Form
                setRecipient={setRecipient}
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
      <ImageCC />
    </div>
    );
  
}

export default App;
