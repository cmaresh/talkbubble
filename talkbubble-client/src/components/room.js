import React from 'react';
import { Member } from './member';
import styled from 'styled-components';

const RoomElem = styled.div`
  position: relative;
  z-index: 1;
  
  border-radius: 10px 10px 0 0;
  height: 100%;
  position: relative;
`
const RoomShader = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  box-shadow: inset var(--talkbubble-shadow);
  pointer-events: none;
  border-radius: 10px;
`

const RoomHeader = styled.div`
  background-color: var(--talkbubble-blue);
  font-size: 16px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--talkbubble-yellow);
  text-transform: uppercase;
  letter-spacing: 0.11em;
`

const MemberList = styled.div`
  height: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`
export function Room(props) {
    return (
      <RoomElem>
        <RoomShader />
        <RoomHeader>Active Users</RoomHeader>
        <MemberList>
        {
          props.members.map((member, index) =>
            <Member 
              key={index} 
              member={member} 
              nickname={member.nickname}
              manageMember={props.manageMember}
              activeMember={props.activeMember}
              muted={props.muteList.includes(member.id)}
            />
          )
        }
        </MemberList>
      </RoomElem>
    );
}
