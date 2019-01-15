export function createAction(type, ...actionArgs) {//创建action的函数，返回一个function
  return (...args) => {//返回一个普通的action
      let action = {type: type, payload: {}};
      actionArgs.forEach((arg, index) => {//遍历actionArgs，将其推入payload中
          action.payload[actionArgs[index]] = args[index];
      });
      return action;
  }
}

export const REG_STATE_CHANGE = 'reg_state_change';
export const SET_CURRENT_SESSION = 'set_currrnet_session';
export const SET_ROSTERS = 'set_rosters';
export const SEND_TEXT_MSG = 'send_text_msg';
export const GET_MSGS = 'get_msgs';
export const CHANGE_MSG_STATUS = 'change_msg_status';
