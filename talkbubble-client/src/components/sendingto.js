import React from 'react';
import styled from 'styled-components';
import {ReactComponent as Cancel_SVG} from '../media/cancel.svg';

export function SendingTo(props) {

    const SendingToElem = styled.div`
        display: none;
        padding: 3px 10px;
        background-color: var(--talkbubble-green);
        color: var(--talkbubble-yellow);
        font-size: 10px;
        margin-bottom: 5px;
        border-radius: 15px;
        align-items: center;
        cursor: pointer;
        transition: 0.2 all linear;

        &.show {
            display: inline-flex;
        }

        .dm-cancel {
            height: 15px;
            width: 15px;
            padding: 0 2px;
            font-size: 16px;
            transition: 0.2s all linear;
            margin-right: 5px;
        }

        &:hover {
            color: var(--talkbubble-green);
            background-color: var(--talkbubble-yellow);
        }
    `
    
    const Recipient = styled.div`
        padding-top: 2px;
    `
    
    return (
        <SendingToElem onClick={() => props.setRecipient({})} className={props.recipient.nickname ? 'show' : ''}>
            <Cancel_SVG className="dm-cancel" />
            <Recipient>To: {props.recipient.nickname}</Recipient>
        </SendingToElem>
    )
}