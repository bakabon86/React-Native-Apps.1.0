import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';

import { Button } from '../components';
import messages from '../Messages';
import { login, logout, signup } from '../actions/auth';

const ContainerView = styled.View`
  flex: 1;
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

const ButtonContainer = styled.View`
  top: 100;
`

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
      };
    
      constructor(props) {
        super(props);
        this.state = {userName:'userName',
                      Password:'Password',
                      token : null
                    };
      }

      checkUser = () => {
        const { onLogin } = this.props;
        //const { userName,Password,token }= this.state;
        var url ='https://mas.agungsedayu.com:8888/hr/login?username='+ this.state.userName +
        '&password='+ this.state.Password
        console.log("URL=" +url)
        return fetch(url)
          .then((response) =>{
            if(response.status===404){
              return {status:false,token:"Null"}
            }
            else{
              return response.json()
            }
    
          }) 
          .then((responseJson) => {              
              if (responseJson.status===true){
                console.log('berhasil')          
                
                this.setState({token : responseJson.token})
                //alert(responseJson.token)
                onLogin(this.state.userName,this.state.Password,this.state.token); 
                this.props.navigation.navigate('Main')
              }
              else{
                console.log('user not found')            
                alert("User Name or Password Incorrect!")
              }        
          });
      }

	render() { 
    return (
        <ContainerView>
            <TitleText> 
                <FormattedMessage message="Login"/> 
            </TitleText>
                
                <TextInput style={{width:100}} placeholder="User Name" 
                    onChangeText={(userName) => this.setState({userName})}/>
               
                <TextInput style={{width:100}} placeholder="Password" secureTextEntry = {true}
                    onChangeText={(Password) => this.setState({Password})}/>
             
            <ButtonContainer>       
                <Button text="Login" onPress = {() =>{ this.checkUser();
                                              }}
                />
            </ButtonContainer>
        </ContainerView>	
    );
  }
}

//export default LoginScreen;
// const mapStateToProps = (username,password,token) => {
//   return {
//       // isLoggedIn: state.reducerLogin.isLoggedIn,
//        //username: state.reducerLogin.username,
//       // password: state.reducerLogin.password,
//       // token: state.reducerLogin.token,
//       username,password,token
//   };
// }

const mapDispatchToProps = (dispatch) => {
  return {
      onLogin: (username, password,token) => { dispatch(login(username, password,token)); },
      onSignUp: (username, password) => { dispatch(signup(username, password)); }
  }
}

 export default connect(null,mapDispatchToProps)(LoginScreen);




