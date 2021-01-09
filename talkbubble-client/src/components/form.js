import React from 'react';

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
          <textarea id="postform-textarea" form="postform" value={this.props.msg} onChange={this.props.handleChange} name="content" placeholder="Add to the Conversation">{this.props.msg}</textarea>
          <div className="below-textarea">
            <div className={"nickname-option accept " + (this.props.updatingNickname ? 'active' : '')} onClick={this.props.nicknameAccept}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.236.236 0 0 1 .02-.022z"/></svg>
            </div>
            <div className={"nickname-option reject " + (this.props.updatingNickname ? 'active' : '')} onClick={this.props.nicknameReject}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path fill-rule="evenodd" d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/></svg>
            </div>
            <div className="posting-as">Posting as: 
              <input type="text" value={this.getAlias()} onChange={this.props.changeNickname} onClick={this.props.nicknameUpdate} />
            </div>
            <div class="char-count">{this.props.msg.length}/256</div>
            <input type="submit" value="Post"></input>
          </div>
        </form>
      );
    }
  }