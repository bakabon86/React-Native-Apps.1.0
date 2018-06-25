import React, { Component } from 'react';
import styled from 'styled-components/native';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { getuserinfo } from '../actions/userInfo';
import { Button } from '../components';
//import  checkToken  from '../actions/checkToken';
//import { AttendanceListScreen } from 'AttendanceList';

const ContainerView = styled.View`
  
  justifyContent: center;
  alignItems: center;
`;

const TitleText = styled.Text`
  fontSize: 30;
  color: ${props => props.theme.WHITE};
`;

const ButtonContainer = styled.View`
  top: 10;
`

// const TokenCek =()=> {  
//   var stillLogon = checkToken(this.props.token)
//   return stillLogon
// }

class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state={
      nik:'',
      nama:'',
      status:'',
    }   
  }
  
  
  componentWillMount=()=>{
    
    // if (TokenCek != null)
    // {     
    //   alert(TokenCek.responseJson.status)
    //   this.props.navigation.navigate('Login')
    // }
    var url ='https://mas.agungsedayu.com:8888/hr/CheckToken?token='+ this.props.token 
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
            this.getNamaNikStatus();
            //onCheckToken(this.state.token); 
            //this.props.navigation.navigate('Main')
        }
        else{
            console.log('token expired')            
            alert("Token expired, Please Login again!")
            this.props.navigation.navigate('Login')
        }        
    });
  }

  getNamaNikStatus=()=>{
    const { onGetUserInfo } = this.props;

    var url ='https://mas.agungsedayu.com:8888/hr/GetUserInfo?token='+ this.props.token 
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
              
           this.setState(
             {
               nik: responseJson.data.NIK,
               nama:responseJson.data.Name,
               status:responseJson.status,
              }
           );
           this.props.onGetUserInfo(this.props.token,this.state.status,this.state.nik,this.state.nama); 
            //this.props.navigation.navigate('Main')
          }
          else{
            console.log('user not found')            
            alert("User not Found!, Please Login again!")
            //this.props.navigation.navigate('Login')
          }        
      });
  }

  render() {
    //const { username, token } = this.state;
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    
    return (
      <ContainerView>
        <TitleText>Home</TitleText>
          {/* <Text>Welcome {this.props.username + ' ' + this.props.token} </Text> */}
          <Text>Welcome to Human Resource Application</Text>
          <Text>{this.state.nik} - {this.state.nama} </Text>
          <Text> {(date + '-' + month + '-' + year) } </Text>

          <ButtonContainer>
             
          </ButtonContainer>
      </ContainerView>
    );
  }
}


const mapStateToProps = ( state ) => {
  return {
    username: state.reducerLogin.username,
    password: state.reducerLogin.password,
    token: state.reducerLogin.token,
    //nik: state.reducerUserInfo.nik
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      onGetUserInfo: (token,status,nik,nama) => { dispatch(getuserinfo(token,status,nik,nama)); },
      onLogout: () => { dispatch(logout()); }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);