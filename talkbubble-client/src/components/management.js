import React from 'react';
import { Room } from './room';
import { Options } from './options';

export function Management(props) {
    return (
      <div className="row flex-one">
        <div className="col-md-10">
          <Room 
            members={props.members}
            manageMember={props.manageMember}
            activeMember={props.activeMember}
            muteList={props.muteList}
          />
        </div>
        <div className="col-md-2">
          <Options 
            activeMember={props.activeMember}
            toggleMute={props.toggleMute}
            directMessage={props.directMessage}
          />
        </div>
      </div>
  );
}