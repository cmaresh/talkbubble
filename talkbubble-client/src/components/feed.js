import { Post } from './post';
import styled from 'styled-components';

const FeedElem = styled.div`
  height: 100%;
  flex: 1;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
`
export function Feed(props) {
    const final = [];
    for (let i = 0; i < props.posts.length; i++) {
      let member;
     for (let j = 0; j < props.members.length; j++) {
       if (props.posts[i].member === props.members[j].id) {
         member = props.members[j];
       }
     }
      let post = props.posts[i];
      if (!props.muteList.includes(post.member)) {
        final.push(<Post 
          activeMember={props.activeMember} 
          key={i} 
          post={post}
          member={member}
          manageMember={props.manageMember}
        />)
      }
    }
    return (
      <FeedElem className="no-scroll" ref={props.setFeedRef}>
        {final}
      </FeedElem>
    );
}