import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

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
        if (e.target.value.length <= 32) {
            setNicknameTemp(e.target.value);
        } else {
            setNicknameTemp(e.target.value.substring(0, 32));
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>
            </NicknameOpt>
            <NicknameOpt className={"nickname-option reject " + (updatingNickname ? 'active' : '')} onClick={() => { setUpdatingNickname(false); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
            </NicknameOpt>
            <PostingAs>Posting as: 
            <NicknameText type="text" value={getNicknameText()} onChange={nicknameChange} onClick={nicknameUpdate} />
            </PostingAs>
        </NicknameElem>
    );
}