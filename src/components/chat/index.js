import React, { Component } from 'react';
import SlideBar from './slidebar';
import SessionList from './sessionlist';
import BubblePanel from './bubblepanel';
import './index.css';

export default class Chat extends Component {

    render() {
        let {params} = this.props;
        return (
            <div className="ctn-chat">
                <div>
                    <SlideBar />
                    <SessionList chatType = {params.chatType} chatId = {params.chatId}/>
                    <BubblePanel />
                </div>
            </div>
        );
    }
}
