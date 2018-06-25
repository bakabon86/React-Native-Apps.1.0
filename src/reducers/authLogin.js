
const defaultState = {
    isLoggedIn: false,
    username: '',
    password: '',
    token:'' ,
    nik:'',
    status:''
  };


function reducerLogin(state = defaultState, action) {
    switch (action.type) {
        case 'LOGIN': 
            return Object.assign({}, state, { 
                isLoggedIn: true,
                username: action.username,
                password: action.password,
                token: action.token
            });
        case 'LOGOUT':
            return Object.assign({}, state, { 
                isLoggedIn: false,
                username: '',
                password: '',
                token: ''
            });       
        default:
            return state;
    }
  }
  
  
  export default reducerLogin;  