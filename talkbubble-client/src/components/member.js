import React from 'react';
import styled from 'styled-components';

const MemberElem = styled.div` 
  font-weight: bold;
  padding: 12px 25px;
  margin-bottom: 0;
  color: var(--talkbubble-yellow);
  font-size: 14px;
  line-height: 20px;
  cursor: pointer;
  border-bottom: 1px solid var(--talkbubble-orange);
  background-color: var(--talkbubble-blue);
  transition: 0.2s background-color linear, 0.2s color linear, 0.4s padding-left ease-out;
  &:hover {
    color: var(--talkbubble-blue);
    background-color: var(--talkbubble-yellow);
  }
  &.active {
    color: var(--talkbubble-blue);
    background-color: var(--talkbubble-yellow);
  }
`

const MuteIcon = styled.span`
  display: none; 
  &.muted {
    display: inline-block; 
  }
`

function selectMember(props) {
  props.manageMember(props.member);
}

function getNickname(props) {
  if (props.nickname) return '(' + props.nickname + ')';
  else return '';
}

export function Member(props) {
      return (
      <MemberElem 
        onClick={() => selectMember(props)}
        className={(props.activeMember === props.member ? 'active' : '')}
      >
        {props.member} {getNickname(props)}
        <MuteIcon className={(props.muted ? 'muted' : '')}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16">
    <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/>
  </svg></MuteIcon>
      </MemberElem>)
      ;
  }