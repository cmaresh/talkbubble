import React from 'react';
import styled from 'styled-components';
import {ReactComponent as MuteOutline_SVG} from '../media/mute-outline.svg';
import {ReactComponent as Message_SVG} from '../media/message.svg';

const OptionsElem = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
  @media(max-width: 768px) {
    flex-direction: row;
    justify-content: space-around;
    margin-top: 0;
  }
`

const Option = styled.div`
  margin-top: 15px;
  opacity: 0;
  color: var(--talkbubble-orange);
  position: relative;
  left: -20px;
  transition: all 0.4s ease-out;
  cursor: pointer;
  &.active {
    opacity: 1;
    left: 0;
  }
  &:hover {
    color: var(--talkbubble-yellow);
  }
`
export function Options(props) {
    return (
      <OptionsElem>
        <Option 
          className={"option mute " + (props.activeMember ? 'active' : '')} 
          onClick={props.toggleMute}
        ><MuteOutline_SVG /></Option>
        <Option 
          className={"option dm " + (props.activeMember ? 'active' : '')} 
          onClick={props.directMessage}
        ><Message_SVG /></Option>
      </OptionsElem>
    );
  }