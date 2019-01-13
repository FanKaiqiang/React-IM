import React, { Component } from 'react';
import Dialog from '@component/common/dialog';
import './index.css';

export default class SessionList extends Component {
    constructor(props) {
        super()
        this.state = {
            friendList: [],
            showPanel: false,
            subscribeMessage:null
        }
    }

    componentWillMount() {
        sdk.conn.listen({
            onOpened: (message) => {//开启页面获取好友列表
                this.getRosters();
            },
            onRoster: () => {//好友变更后获取好友列表
                this.getRosters();
            },
            onPresence: (message) => {//同意添加对方为好友
                this.handlePresence(message);
            }
        });
    }

    handlePresence = (message) => {
        //对方收到请求加为好友
        if (message.type === 'subscribe') {
            this.setState({
                showPanel: true,
                subscribeMessage: message
            });
            //this.subscribeMessage = message;

            //显示统一/拒绝面板，如果同意，

        }
    }

    agree = () => {
        let message = this.state.subscribeMessage;
        sdk.conn.subscribed({
            to: message.from,
            message: '[resp:true]'
        });
        sdk.conn.subscribe({//需要反向添加对方好友
            to: message.from,
            message: '[resp:true]'
        });
        this.setState({
            showPanel: false
        });
    }
    reject = () => {
        let message = this.state.subscribeMessage;

        sdk.conn.unsubscribed({
            to: message.from,
            message: 'rejectAddFriend'
        });

        this.setState({
            showPanel: false
        });
    }

    getRosters = () => {
        sdk.conn.getRoster({
            success: (rosters) => {
                rosters = rosters.filter((roster) => {
                    return roster.subscription === 'both';
                });

                this.setState({
                    friendList: rosters
                });
            },
            error: (e) => {
                //alert(e);
            }
        });
    }

    render() {
        let {friendList, showPanel, subscribeMessage} = this.state;
        return (
            <div className="sessionlist">
                {friendList.length ? friendList.map((friend) => {
                    return <SessionItem friend={friend} key={friend.name} />
                }) : null}
                {/* 下面不是好方法 */}
                {showPanel ? <Dialog className=""
                    title="好友申请"
                    content={
                        <div>
                            <div>{subscribeMessage.from}邀请你加为好友</div>
                            <div>留言：{subscribeMessage.status}</div>
                        </div>

                    }
                    footer={
                        <div>
                            <button className="reject" onClick={this.reject}>拒绝</button>
                            <button className="accept" onClick={this.agree}>同意</button>
                        </div>
                    }
                >
                </Dialog> : null}
            </div>
        );
    }
}

class SessionItem extends Component {
    render() {
        let { friend } = this.props;
        return <div className="session-item">
            {friend.name}
        </div>;
    }
}