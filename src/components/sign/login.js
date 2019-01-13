import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';
import { login } from '@data/actions/sign';
import {setToken} from '@util/token';
import tooltip from '@component/common/tooltip';
import history from '@history/history';


@connect(
  (state) => ({}),
  {
    login
  }
)
export default class Login extends Component {
  login = () => {
    let { login } = this.props;
    let user = this.refs.name.value.trim();
    let pwd = this.refs.auth.value.trim();
    if (!user || !pwd) {
      tooltip.show({
          type: 'error',
          content: '账号密码不能为空'
      });
      return;
  }
    let options = {
      apiUrl: WebIM.config.apiURL,
      appKey: WebIM.config.appkey,
      user,
      pwd
    }
    login(options).then((token) => {
      //存起来，放到内存里面， 并且考虑安全性 
      setToken(token);
      tooltip.show({
        content: '登录成功',
        type: 'success'
    });
      history.push('/chat');
    }).catch(() => {
      //出现tooltip
      tooltip.show({
        type: 'error',
        content: '登录失败'
      });
    })
  }

  render() {
    let mainClassName = classnames({
      'sign': true,
      'login': true
    });
    return (
      <div className={mainClassName}>
        <h2>登录页面</h2>
        <input ref='name'
          name="name"
          className="input"
          placeholder='输入用户名'
          autoFocus={true}
        />
        <input ref='auth'
          name="auth"
          className="input"
          placeholder='输入密码'
          type='password'
        />

        <button className="button" onClick={this.login}>登录</button>
        <p>没有账号,
                <Link to="/signup">请注册 </Link>
        </p>
      </div>
    );

  }
}