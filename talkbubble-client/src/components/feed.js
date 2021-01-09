import { Post } from './post';

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
        />)
      }
    }
    return (
      <div className="feed" ref={props.setFeedRef}>
        {final}
      </div>
    );
}