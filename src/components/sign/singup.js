import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { reg } from '@data/actions/sign';
import tooltip from '@component/common/tooltip';
import safeRender from '@decorator/saferender';
import history from '@history/history';
import classnames from 'classnames';
import './index.css';

@connect(
    state => ({
        regState: state.sign.regState
    }),
    {
        reg
    }
)

@safeRender({
    active: true,
    errorHandler: function(e)  {//错误处理：弹出抛错的钩子
        // alert(e.displayName + '---' + e.method)
    }
})
export default class SignUp extends Component {

    componentDidMount(){
        // throw new Error('')
    }

    signup = () => {
        //收集用户信息，用户名和密码不能为空
        let username = this.refs.name.value;
        let pwd = this.refs.auth.value;
        let nickname = this.refs.nickname.value;
        if (!username || !pwd) {
            return false;
        }


        // //环信的API
        let options = {
            username: username.toLowerCase(),
            password: pwd,
            nickname: nickname,
            appKey: WebIM.config.appkey,
            apiUrl: WebIM.config.apiURL,
        };
        // sdk.conn.registerUser(options);

        this.props.reg(options).then(() => {
            //跳转
            tooltip.show({
                content: '注册成功',
                type: 'success'
            });
            history.push('/login');
        }).catch(() => {
            //显示tooltip
            tooltip.show({
                content:'注册失败了',
                type:`error`
                
            })
        });
    }
    render() {
        let mainClassName = classnames({
            'sign': true,
            'signup': true
        });
        let { regState } = this.props;
        // 使用classnames插件可以通过true/false控制组件类的组合
        return (
            <div className={mainClassName}>
                <h2>注册页面</h2>
                <input ref='name'
                    className="input"
                    name="name"
                    placeholder='输入用户名'
                    autoFocus={true}
                    onInput={this.keyDown} />
                <input ref='auth'
                    className="input"
                    name="auth"
                    placeholder='输入密码'
                    type='password'
                    onInput={this.keyDown} />
                <input ref="nickname"
                    className="input"
                    name="nickname"
                    placeholder='输入昵称'
                    onInput={this.keyDown} />

                <button className="button" onClick={this.signup}>注册</button>
                <p>已有账户,
                    <Link to="/login">登录 </Link>
                </p>
                {regState === 1 ? <Loading /> : null}
            </div>
        );

    }
}

class Loading extends Component {
    render() {
        return (
            <div className="loading">
                正在加载中
            </div>
        )
    }
}