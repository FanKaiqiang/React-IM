import {SET_CURRENT_SESSION, SET_ROSTERS, createAction} from './actiontypes';

export let setCurrentSession = createAction(SET_CURRENT_SESSION, 'session');
export let setRosters = createAction(SET_ROSTERS, 'rosters');

export function getRosters() {
    return (dispatch, getState) => {
        return new Promise((resolve, reject) => {
            sdk.conn.getRoster({
                success: (rosters) => {
                    rosters = rosters.filter((roster) => {
                        return roster.subscription === 'both';
                    });
                    dispatch(setRosters(rosters));
                    resolve(rosters);
                },
                error: (e) => {
                    reject(e);
                }
            });
        });

    }
}

export function changeRosterWithMsg(msg) {//
    return (dispatch, getState) => {
        let name = msg.body ? msg.body.to :  msg.from;
        let rosters = getState().session.rosters;//获取所有好友
        let newRosters = rosters.map((roster) => {//遍历
            let newRoster = {...roster};
            if (roster.name === name) {//遍历到要更新的好友
                newRoster.message = msg;//消息填充
            }
            return newRoster;
        })

        dispatch(setRosters(newRosters));
    }
} 