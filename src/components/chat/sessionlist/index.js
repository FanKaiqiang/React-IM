import React, { Component } from 'react';
import Avator from '@component/common/avator';
import {showDialog, closeDialog} from '@component/common/dialog';
import { Link } from 'react-router';
import './index.css';
import {connect} from 'react-redux';
import {setCurrentSession} from '@data/actions/session';

export default class SessionList extends Component {
    constructor(props) {
        super()
        this.state = {
            friendList: [],
            showPanel: false,
            subscribeMessage: null
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
                subscribeMessage: message
            });
            this.showPresenceDialog();
        }
    }

    showPresenceDialog = () => {
        let { subscribeMessage } = this.state;
        showDialog({
            title: "好友申请",
            content: <div>
                <div>{subscribeMessage.from}邀请你加为好友</div>
                <div>留言：{subscribeMessage.status}</div>
            </div>,


            footer: <div>
                <button className="button reject" onClick={this.reject}>拒绝</button>
                <button className="button accept" onClick={this.agree}>同意</button>
            </div>
        });
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
        closeDialog();
    }
    reject = () => {
        let message = this.state.subscribeMessage;

        sdk.conn.unsubscribed({
            to: message.from,
            message: 'rejectAddFriend'
        });

        closeDialog();
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
        let { friendList, showPanel } = this.state;
        let { chatId } = this.props;
        return (
            <div className="sessionlist">
                {friendList.length ? friendList.map((friend) => {
                    let isSelected = friend.name === chatId;
                    return <SessionItem friend={friend} key={friend.name} isSelected={isSelected} />
                }) : null}
            </div>
        );
    }
}

@connect(
    (state) => ({

    }),
    {
        setCurrentSession
    }
)
class SessionItem extends Component {
    itemClick = () => {
        let {setCurrentSession, friend} = this.props;
        setCurrentSession(friend);
    }
    render() {
        let {friend, isSelected} = this.props;
        let url = `chat/single/${friend.name}`;

        return <div className={ isSelected? "session-item-outer selected" : "session-item-outer"}>
            <Link to = {url} className="session-item" onClick = {this.itemClick}>
                <div className="ctn-avator">
                    <Avator />
                </div>
                <div className="session-inner">
                    <div className="name">{friend.name}</div>
                    <div className="msg-preview"></div>
                </div>
            </Link>
        </div>;
    }
}