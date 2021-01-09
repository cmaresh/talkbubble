import React from 'react';
import styled from 'styled-components';


const PostElem = styled.div`
  color: var(--talkbubble-orange);
  font-size: 16px;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
  transition: 0.2s all linear;
  display: flex;
  cursor: pointer;
  &.inactive {
    opacity: 0.3;
  }
  &.sending {
    background-color: var(--talkbubble-green);
    color: var(--talkbubble-yellow);
  }
  &.receiving {
    background-color: var(--talkbubble-orange);
    color: var(--talkbubble-blue);
  }
  @media(max-width: 768px) {
    margin-left: 0;
    margin-right: 0;
  }
`

const Message = styled.div`
  word-wrap: break-word;
  overflow-x: hidden;
`
export class Post extends React.Component {
  constructor(props){
    super(props);
    this.directText = this.directText.bind(this);
    this.msgClass = this.msgClass.bind(this);
    this.getNickname = this.getNickname.bind(this);
    this.selectMember = this.selectMember.bind(this);
  }
  
    selectMember() {
      this.props.manageMember(this.props.post.member);
    }

    directText() {
      if (!this.props.post.recipient) return '';
      else if (this.props.post.recipient === window.memberId) return '@ You';
      else return '@ ' + this.props.post.recipient;
    }
  
    msgClass() {
      if (!this.props.post.recipient) return '';
      else if (this.props.post.recipient === window.memberId) return 'receiving';
      else return 'sending';
    }
  
    getNickname() {
      if (!this.props.member) return '';
      else if (this.props.member.nickname) return '(' + this.props.member.nickname + ')';
      else return '';
    }
    render() {
      return(
        <PostElem onClick={this.selectMember} className={"post " + 
          (this.props.activeMember && this.props.post.member !== this.props.activeMember ? 'inactive ' : ' ') +
          (this.msgClass())
        }>
          <Message className="msg">
            <b>
            {this.props.post.member}
            {this.getNickname()}&nbsp;
            {this.directText()}<br></br>
            </b>
            {this.props.post.msg}
          </Message>
        </PostElem>
      );
    }
  }