import React from 'react';
import styled from 'styled-components';
import {ReactComponent as ChatDots_SVG} from '../media/chat-dots.svg';
import {ReactComponent as People_SVG} from '../media/people.svg';
import {ReactComponent as Logo_SVG} from '../media/logo.svg';

const NavElem = styled.div`
  padding-top: 5px;
  background-color: var(--talkbubble-blue);
  border-bottom: 1px solid var(--talkbubble-yellow);
`
const Pages = styled.div`
  display: none;
  color: var(--talkbubble-yellow);
  @media(max-width: 768px) {
    display: block;
  }
`

const Page = styled.div`
  display: none;
  &.active {
    display: block;
  }
`

export function Nav(props) {
    return (
    <NavElem>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 d-flex justify-content-between">
          <Logo_SVG />
          <Pages onClick={() => props.location === 'feed' ? props.setLocation('mgmt') : props.setLocation('feed')}>
            <Page className={props.location === 'feed' ? 'active' : ''}><ChatDots_SVG /></Page>
            <Page className={props.location === 'mgmt' ? 'active' : ''}><People_SVG /></Page>
          </Pages>
          </div>
        </div>
      </div>
    </NavElem>
    );
}