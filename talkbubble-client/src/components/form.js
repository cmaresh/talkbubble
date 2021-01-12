import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Nickname } from './nickname';

const MAX_POST_LENGTH = 256;

const FormInput = styled.textarea`
  display: block;
  width: 100%;
  border-radius: 10px;
  border: none;
  height: 45px;
  padding: 10px 15px;
  resize: none;
  &:active {
    outline: none;
  }
  &::placeholder {
    color: gray;
    opacity: 1;
    font-size: 16px;
    color: var(--talkbubble-blue);
  }
  @media(max-width: 768px) {
    height: 40px;
    font-size: 12px;
    &::placeholder {
      text-align: left;
      font-size: 16px;
      line-height: 100%;
    }
  }
`
const FormOpt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  @media(max-width: 768px) {
    margin-bottom: 10px;
  }
`

const Submit = styled.input`
  background-color: var(--talkbubble-yellow);
  border-radius: 10px;
  border: none;
  width: 72px;
  height: 36px;
  padding: 5px;
  color: var(--talkbubble-blue);
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.1s all linear;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--talkbubble-green);
    color: var(--talkbubble-yellow);
  }
`

const CharCount = styled.div`
  color: var(--talkbubble-yellow); 
`

export function Form(props) {
  const [msg, setMsg] = useState('');
  const [lastKey, setLastKey] = useState('');
  const [shift, setShift] = useState(false);

  function chat() {
    if (msg.length < 1) return;
    props.socketio.sendChat(msg);
    setMsg('');
  }

  function inputChange(e) {
    if (lastKey === 'Enter' && !shift) return;
    if (e.target.value.length <= MAX_POST_LENGTH) {
      setMsg( e.target.value );
    } else {
      setMsg( e.target.value.substring(0, MAX_POST_LENGTH) );
    }
  }

  useEffect(() => {
    setMsg(props.recipient + ' ' + msg);
  }, [props.recipient]);

  useEffect(() => {
    window.addEventListener('keydown', e => {
      if (e.repeat) return;
      if (e.key === "Shift") {
        console.log('whats happening');
        setShift(true);
      }
      setLastKey(e.key);
      if (e.key === 'Enter' && !shift) {
        chat();
      }
    });

    window.addEventListener('keyup', e => {
      if (e.key === "Shift") {
        setShift(false);
      }
    });
  }, []);

  return (
    <form id="postform" action="javascript:void(0)" onSubmit={chat}>
      <FormInput id="postform-textarea" form="postform" value={msg} onChange={inputChange} name="content" placeholder="Chat">{msg}</FormInput>
      <FormOpt className="below-textarea">
        <Nickname user={props.user} socketio={props.socketio} />
        <CharCount>{msg.length}/{MAX_POST_LENGTH}</CharCount>
        <Submit type="submit" value="Post"></Submit>
      </FormOpt>
    </form>
  );
}