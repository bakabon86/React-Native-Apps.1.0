const defaultState = {
    isLoggedIn: false,
    username: '',   
    token:'' ,
    nik:'',
    status:''
  };

function reducerUserInfo(state = defaultState, action) {
    switch (action.type) {
        case 'GETUSERINFO':
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username, 
                token: action.token,
                nik: action.nik,
                status: action.status,               
            });
        default:
            return state;
    }
}

export default reducerUserInfo;