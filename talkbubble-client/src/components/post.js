import React from 'react';
import styled from 'styled-components';


const PostElem = styled.div`
  color: var(--talkbubble-orange);
  font-size: 16px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s all linear;
  display: flex;
  cursor: pointer;
  &.inactive {
    opacity: 0.3;
  }
  &.sending {
    background-color: var(--talkbubble-green);
    color: var(--talkbubble-yellow);
  }
  &.receiving {
    background-color: var(--talkbubble-orange);
    color: var(--talkbubble-blue);
  }
  @media(max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`

const Message = styled.div`
  word-wrap: break-word;
  overflow-x: hidden;
`

function directText(props) {
  if (!props.post.recipient) return '';
  else if (props.post.recipient === props.user.id) return '@ You';
  else return ' @ ' + props.post.recipient.nickname;
}

function msgClass(props) {
  if (!props.post.recipient) return '';
  else if (props.post.recipient.id === props.user.id) return 'receiving';
  else return 'sending';
}

export function Post(props) {
      return(
        <PostElem className={"post " + 
          (props.activeMember.id && props.post.member !== props.activeMember.id ? 'inactive ' : ' ') +
          (msgClass(props))
        }>
          <Message className="msg">
            <b>
            {props.member.nickname}
            {directText(props)}<br></br>
            </b>
            {props.post.msg}
          </Message>
        </PostElem>
      );
  }