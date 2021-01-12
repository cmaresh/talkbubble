import React, { useEffect } from 'react';
import { Post } from './post';
import styled from 'styled-components';
import popfile from '../media/pop.wav';

const SCROLL_SNAP_BUFFER = 100;

const FeedElem = styled.div`
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
export function Feed(props) {
  const elemRef = React.createRef();
  const pop = new Audio(popfile);
  
  useEffect(() => {
    let lockScroll = false;
    if (elemRef) lockScroll = Math.abs(elemRef.scrollHeight - elemRef.scrollTop - elemRef.clientHeight) < SCROLL_SNAP_BUFFER;
    if (elemRef && lockScroll) elemRef.scrollTop = elemRef.scrollHeight;
    pop.play();
  }, [props.posts]);

  let member;
  let postList = props.posts.map((post, index) => {
    if (props.muteList.includes(post.member)) return;
    member = props.members.find(memberTemp => memberTemp.id === post.member);
    return (
      <Post 
        key={index}
        activeMember={props.activeMember}
        post={post}
        member={member}
        user={props.user}
      />
    );
  });
  return (
    <FeedElem className="no-scroll" ref={elemRef}>
      {postList}
    </FeedElem>
  );
}