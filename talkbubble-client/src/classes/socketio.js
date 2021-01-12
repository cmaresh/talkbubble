import socketIOClient from "socket.io-client";

export class SocketIO {
    constructor(props) {
        this.props = props;
        //ENDPOINT = "https://www.talkbubble.org:4001";
        const ENDPOINT = "http://127.0.0.1:4001";
        this.socket = socketIOClient(ENDPOINT, { secure: true });

        this.socket.emit('join', (user, members) => {
            this.props.setUser(user);
            this.props.setMembers(members);
        });

        this.socket.on('new member', (data) => {
            this.props.setMembers([...this.props.members, data]);
        });

        this.socket.on('member left', (member) => {
            this.props.setMembers([...this.props.members.filter(memberTemp => memberTemp.id !== member)]);
        });

        this.socket.on('change topic', (topic) => {
            this.props.setTransitioningTopic(true);
            setTimeout(() => {
                this.props.setTopic(topic);
                this.props.setTransitioningTopic(false);
            }, 1000);
        });

        this.socket.on('change nickname', (data) => {
            const membersCpy = [...this.props.members];
            membersCpy.forEach((member) => {
                if (member.id === data.id) {
                    member.nickname = data.nickname;
                }
            });
            this.props.setMembers(membersCpy);
        });
        
        this.socket.on('chat', (data) => {
            this.props.setPosts([...this.props.posts, data]);
        });
    }

    //do NOT update state in this function
    updateProps(props) { this.props = props; }

    sendChat(msg, recipient) {
        const chat = {
            msg,
            member: this.props.user.id,
        }
        if (recipient.id) chat.recipient = recipient;

        this.socket.emit('chat', chat);
    }

    changeNickname(nickname) {
        this.socket.emit('change nickname', { 
            nickname,
            id: this.props.user.id, 
        });
    }
}