export default function signReducer(state = {
    regState: 0, //注册状态， 0 表示未注册， 1表示注册成功 2表示注册失败
}, action) {
    switch (action.type) {
        case 'REG_STATE_CHANGE':
            return Object.assign({}, state, {
                regState: action.payload.state
            })
    }
    return state;
}