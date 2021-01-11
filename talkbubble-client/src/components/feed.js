import React, { useState, useEffect } from 'react';
import { Post } from './post';
import styled from 'styled-components';
import popfile from '../media/pop.wav';

const FeedElem = styled.div`
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
export function Feed(props) {
  const [posts, setPosts] = useState([]);
  const elemRef = React.createRef();
  const pop = new Audio(popfile);
  
  useEffect(() => {
    let lockScroll = false;
    if (elemRef) lockScroll = Math.abs(elemRef.scrollHeight - elemRef.scrollTop - elemRef.clientHeight) < 100;
    if (elemRef && lockScroll) elemRef.scrollTop = elemRef.scrollHeight;
    pop.play();
  }, [props.posts]);

  let final;
  let member;
  let postList = props.posts.map(post => {
    if (props.muteList.includes(post.member)) return;
    member = props.members.find(memberTemp => memberTemp.id === post.member);
    return (
      <Post 
        activeMember={props.activeMember}
        post={post}
        member={member}
      />
    );
  });
  return (
    <FeedElem className="no-scroll" ref={elemRef}>
      {postList}
    </FeedElem>
  );
}