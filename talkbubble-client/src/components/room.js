import { Member } from './member';

export function Room(props) {
    return (
      <div className="room">
        <div className="room-shader"></div>
        <div className="header">
          Active Users
        </div>
        <div className="member-list">
        {
          props.members.map((member, index) =>
            <Member 
              key={index} 
              member={member.id} 
              nickname={member.nickname}
              manageMember={props.manageMember}
              activeMember={props.activeMember}
              muted={props.muteList.includes(member.id)}
            />
          )
        }
        </div>
      </div>
    );
}
