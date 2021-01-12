import React, { useState } from 'react';
import styled from 'styled-components';
import {ReactComponent as Confirm_SVG} from '../media/confirm.svg';
import {ReactComponent as Cancel_SVG} from '../media/cancel.svg';

const MAX_NICKNAME_LENGTH = 32;
const NicknameElem = styled.div`
    display: flex;
    justify-content: flex-start;
    flex: 1;
    align-items: center;
`

const PostingAs = styled.div`
    color: var(--talkbubble-yellow);
    font-size: 14px;
    flex: 1;
`

const NicknameText = styled.input`
    background-color: var(--talkbubble-blue);
    border: 0;
    outline: 0;
    padding-left: 5px;
    color: var(--talkbubble-yellow);
    width: 100px;
`

const NicknameOpt = styled.div`
    border-radius: 5px;
    color: var(--talkbubble-orange);
    transition: all 0.2s linear, width 0.1s linear;
    cursor: pointer;
    opacity: 0;
    width: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    &.active {
        opacity: 1;
        width: 36px;
        margin-right: 5px;
    }
    &.accept {
        background-color: var(--talkbubble-green);
    }
    &.reject {
        background-color: #4E1717;
    }
    &.hover {
        color: var(--talkbubble-yellow);
    }
`
  
export function Nickname(props) {
    const [updatingNickname, setUpdatingNickname] = useState(false);
    const [nickname, setNickname] = useState('');
    const [nicknameTemp, setNicknameTemp] = useState('');


    function getNicknameText() {
        if (updatingNickname) return nicknameTemp;
        else if (nickname) return nickname;
        else return props.user.memberId;
    }

    function nicknameUpdate() {
        setNicknameTemp(nickname);
        setUpdatingNickname(true);
    }

    function nicknameChange(e) {
        if (e.target.value.length <= MAX_NICKNAME_LENGTH) {
            setNicknameTemp(e.target.value);
        } else {
            setNicknameTemp(e.target.value.substring(0, MAX_NICKNAME_LENGTH));
        }
    }

    function nicknameAccept() {
        props.socketio.changeNickname(nicknameTemp);
        setNickname(nicknameTemp);
        setUpdatingNickname(false);
    }

    return (
        <NicknameElem>
            <NicknameOpt className={"nickname-option accept " + (updatingNickname ? 'active' : '')} onClick={nicknameAccept}>
                <Confirm_SVG />
            </NicknameOpt>
            <NicknameOpt className={"nickname-option reject " + (updatingNickname ? 'active' : '')} onClick={() => { setUpdatingNickname(false); }}>
                <Cancel_SVG />
            </NicknameOpt>
            <PostingAs>Posting as: 
            <NicknameText type="text" value={getNicknameText()} onChange={nicknameChange} onClick={nicknameUpdate} />
            </PostingAs>
        </NicknameElem>
    );
}