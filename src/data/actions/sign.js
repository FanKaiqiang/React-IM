import {REG_STATE_CHANGE} from '../actions/actiontypes';
// REG_START/REG_SUCCESS/REG_ERROR 1 2 3
export function regStatus(state){
    return{
        type:REG_STATE_CHANGE,
        payload:{
            state
        }
    }
}

export function reg(options) {//返回一个异步的action
    return (dispatch, getState) => {//返回一个Promise
        return new Promise((resolve, reject) => {//将注册的成功失败转为Promise的形式
            let onSuccess = options.success;
            let onError = options.error;
            options.success = function () {
                onSuccess && onSuccess();//存在就执行
                dispatch(regStatus(2));
                resolve();
            }
            options.error = function (e) {
                onError && onError();//存在就执行
                dispatch(regStatus(3));
                reject(e);
            };
            dispatch(regStatus(1));
            sdk.conn.registerUser(options);
        });
    }
}

export function login(options) {//返回一个异步的action
    return (dispatch, getState) => {//返回一个Promise
        return new Promise((resolve, reject) => {//将注册的成功失败转为Promise的形式
            options.success = function () {
                resolve();
            }
            options.error = function (e) {
                reject(e);
            };
            sdk.conn.open(options);
        });
    }
}