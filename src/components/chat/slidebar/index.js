import React, { Component } from 'react';
import { getToken } from '@util/token';
import Icon from '@component/common/icon';
import Avator from '@component/common/avator';
import {showDialog} from '@component/common/dialog';
import './index.css';

export default class SlideBar extends Component {
    state = {
        showPanel: false
    }
    showAddRosterPanel = () => {
        // this.setState({
        //     showPanel: true
        // });
        
        showDialog({
            content:
                <div className="input-container">
                    <input type="text"  className="input" placeholder="输入名字" />
                </div>,

            footer:<div className="footer">
                    <button className="button" onClick = {this.addRoster}>确定</button>
                </div>,
            title: '添加好友'
        })
    }
    addRoster = () => {//对话框点击确认触发的事件：添加好友
        if (this.refs.nickname) {
            let value = this.refs.nickname.value;
            if (!value.trim()) {
                alert('内容不能为空');
                return;
            }
        }
        sdk.conn.subscribe({
            to: this.refs.nickname.value,
            // Demo里面接收方没有展现出来这个message，在status字段里面
            message: '加个好友呗!'   
        });

        this.setState({
            showPanel: false
        });

    }
    render() {
        let tokenUser = getToken();
        let { showPanel } = this.state;
        let username = tokenUser ? tokenUser.user.username : '';
        return (
            <div className="slideBar">
                <div className="profile">
                    <div className="app-item">
                        <Avator />
                    </div>
                    {/* <span className="iconfont icon-usered" /> */}
                    <div className="name">{username}</div>
                </div>
                <div className="menus">
                    <div className="app-item chat">
                        <Icon type="chat" />
                    </div>
                    <div className="app-item group">
                        <Icon type="chat1" />
                    </div>
                </div>
                <div className="footer">
                    <div className="app-item setting" onClick={this.showAddRosterPanel}>
                        <Icon type="setting1" />
                    </div>
                </div>
            </div>
        );
    }
}

