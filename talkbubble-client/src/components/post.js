import React from 'react';

export class Post extends React.Component {
  constructor(props){
    super(props);
    this.directText = this.directText.bind(this);
    this.msgClass = this.msgClass.bind(this);
    this.getNickname = this.getNickname.bind(this);
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
        <div className={"post " + 
          (this.props.activeMember && this.props.post.member !== this.props.activeMember ? 'inactive ' : ' ') +
          (this.msgClass())
        }>
          <div className="msg">
            <b>
            {this.props.post.member}
            {this.getNickname()}&nbsp;
            {this.directText()}<br></br>
            </b>
            {this.props.post.msg}
          </div>
        </div>
      );
    }
  }