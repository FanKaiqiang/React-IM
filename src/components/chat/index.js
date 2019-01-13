import React, { Component } from 'react';
import SlideBar from './slidebar';
import SessionList from './sessionlist';
import BubblePanel from './bubblepanel';
import './index.css';

export default class Chat extends Component {

    render() {
        return (
            <div className="ctn-chat">
                <div>
                    <SlideBar />
                    <SessionList />
                    <BubblePanel />
                </div>
            </div>
        );
    }
}
