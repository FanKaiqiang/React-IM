import React, { Component } from 'react';

import SlideBar from './slidebar';
import SessionList from './sessionlist';
import BubblePanel from './bubblepanel';
export default class Chat extends Component {

    render() {
        console.log(this.props);
        return (
            <div className="chat">
                <div>
                    <SlideBar />
                    <SessionList />
                    <BubblePanel />
                </div>

            </div>
        );
    }
}
