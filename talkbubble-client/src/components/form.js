import React from 'react';
import styled from 'styled-components';

const FormInput = styled.textarea`
  display: block;
  width: 100%;
  border-radius: 10px;
  border: none;
  height: 45px;
  padding: 10px 15px;
  resize: none;
  &:active {
    outline: none;
  }
  &::placeholder {
    color: gray;
    opacity: 1;
    font-size: 16px;
    color: var(--talkbubble-blue);
  }
  @media(max-width: 768px) {
    height: 40px;
    font-size: 12px;
    &::placeholder {
      text-align: left;
      font-size: 16px;
      line-height: 100%;
    }
  }
`
const FormOpt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  @media(max-width: 768px) {
    margin-bottom: 10px;
  }
`

const Submit = styled.input`
  background-color: var(--talkbubble-yellow);
  border-radius: 10px;
  border: none;
  width: 72px;
  height: 36px;
  padding: 5px;
  color: var(--talkbubble-blue);
  text-transform: uppercase;
  font-size: 16px;
  transition: 0.1s all linear;
  margin-left: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    background-color: var(--talkbubble-green);
    color: var(--talkbubble-yellow);
  }
`

const PostingAs = styled.div`
  color: var(--talkbubble-yellow);
  font-size: 14px;
  flex: 1;
`

const Nickname = styled.input`
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

const CharCount = styled.div`
  color: var(--talkbubble-yellow); 
`
export class Form extends React.Component {
    constructor(props){
      super(props);
  
      this.getAlias = this.getAlias.bind(this);
    }
  
    getAlias() {
      if (this.props.updatingNickname) {
        return this.props.nicknameTemp;
      }
      else if (this.props.nickname) {
        return this.props.nickname;
      }
      else {
        return window.memberId;
      }
    }
  
    render() {
      return (
        <form id="postform" action="javascript:void(0)" onSubmit={this.props.onSubmit}>
          <FormInput id="postform-textarea" form="postform" value={this.props.msg} onChange={this.props.handleChange} name="content" placeholder="Chat">{this.props.msg}</FormInput>
          <FormOpt className="below-textarea">
            <NicknameOpt className={"nickname-option accept " + (this.props.updatingNickname ? 'active' : '')} onClick={this.props.nicknameAccept}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>
            </NicknameOpt>
            <NicknameOpt className={"nickname-option reject " + (this.props.updatingNickname ? 'active' : '')} onClick={this.props.nicknameReject}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
            </NicknameOpt>
            <PostingAs>Posting as: 
              <Nickname type="text" value={this.getAlias()} onChange={this.props.changeNickname} onClick={this.props.nicknameUpdate} />
            </PostingAs>
            <CharCount>{this.props.msg.length}/256</CharCount>
            <Submit type="submit" value="Post"></Submit>
          </FormOpt>
        </form>
      );
    }
  }