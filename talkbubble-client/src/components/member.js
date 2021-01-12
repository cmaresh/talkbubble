import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Mute_SVG} from '../media/mute.svg';

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

export function Member(props) {
      return (
      <MemberElem 
        onClick={() => props.manageMember(props.member)}
        className={(props.activeMember === props.member ? 'active' : '')}
      >
        {props.member} {props.nickname ? '(' + props.nickname + ')' : ''}
        <MuteIcon className={(props.muted ? 'muted' : '')}><Mute_SVG /></MuteIcon>
      </MemberElem>)
      ;
  }