import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import store from './data/create';
import SignUp from '@component/sign/singup';
import Login from '@component/sign/login';
import Chat from '@component/chat';
import history from '@history/history';
import './App.css';

class App extends Component {
  // componentWillReceiveProps() {

  // }
  render() {
    return (
      <div className="main">
      侧边栏
         {this.props.children}
      </div>
    );
  }
}

export default class Main extends Component {//使用router配置页面路由
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <Route path="/" component={App}>
            <Route path="/signup" component={SignUp} />
            <Route path="/login" component={Login} />
            <Route path="/chat" component={Chat} />
            <Route path="/chat/:chatType/:chatId" component={Chat} />
          </Route>
        </Router>
      </Provider>
    )
  }
}

