import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,FlatList,ScrollView,Picker } from 'react-native';
import DatePicker from 'react-native-datepicker'; //datepicker
import { Constants } from 'expo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';

import { Button } from '../components';
import index from '../store';
import { colors } from '../utils/constants';


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
  top: 50;
  flex: 1;
`
//setup datepicker
var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();


class LeaveRequestScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            issueddate : (month + '-' + date + '-' + year) , 
            startdate : (month + '-' + date + '-' + year) , 
            enddate : (month + '-' + date + '-' + year) , 
            saldoCuti : 0,
            kodeCuti : '',
            datasourcekodeCuti : [],
            kodeKeperluan : '',
            datasourceKeperluan : [],
        }
    }
    componentWillMount = () => {
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
                  this.getSaldoCuti();   
                  this.getKodeCuti();  
                  this.getKeperluan();   
              }
              else{
                console.log('token expired')            
                alert("Token expired, Please Login again!")
                this.props.navigation.navigate('Login')
              }        
          });
    }

    getSaldoCuti = () =>{

        var url ='https://mas.agungsedayu.com:8888/hr/GetLeaveBalance?token='+ this.props.token + '&code=CT001'
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
               this.setState({
                 saldoCuti : responseJson.data
               })
               console.log("saldoCuti=" +this.state.saldoCuti)
              }
              else{
                console.log('Leave balance could not be found')            
                alert("Leave balance not Found!, Please Retry!")
                //this.props.navigation.navigate('Login')
              }        
          });
      }

      getKodeCuti = () => {
        var url ='https://mas.agungsedayu.com:8888/hr/GetLeaveCode?token='+ this.props.token 
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
               this.setState({
                 datasourcekodeCuti : responseJson.data,
               })
               
               //console.log(this.state.datasourcekodeCuti)
              }
              else{
                console.log('Kode Cuti could not be found')                            
                //this.props.navigation.navigate('Login')
              }        
          });
      }

      getKeperluan = ()=>{
        var url ='https://mas.agungsedayu.com:8888/hr/GetLeavePurposes?token='+ this.props.token 
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
               this.setState({
                datasourceKeperluan : responseJson.data,
               })
               
               //console.log(this.state.datasourcekodeCuti)
              }
              else{
                console.log('Kode Cuti could not be found')                            
                //this.props.navigation.navigate('Login')
              }        
          });
      }
    render(){
        return(
            <View  style={{flex : 1 ,paddingTop:Constants.statusBarHeight}}>
               
                    <TitleText>Leave Request</TitleText>
                        <Text>{this.props.nik} - {this.props.username}</Text> 
                        <Text>Sisa Saldo Cuti :{this.state.saldoCuti}</Text>
                        <ContainerView >
                            <Text>Tanggal Pengajuan :</Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.state.issueddate}
                                mode="date"
                                placeholder="select date"
                                format="MM-DD-YYYY"
                                minDate="01-01-2013"
                                maxDate="12-31-2030"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: { position: 'absolute', left: 0,top: 4, marginLeft: 0 },
                                    dateInput: { marginLeft: 36 }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({issueddate: date})}}
                            /> 
                            <Text>Kode Cuti :</Text>
                            <Picker
                                style={{height:50, width:400, backgroundColor:colors.WHITE}}
                                selectedValue={this.state.kodeCuti}                    
                                onValueChange={(itemValue, itemIndex) => this.setState({kodeCuti: itemValue})} >                    
                                    {this.state.datasourcekodeCuti.map((item, key)=>(
                                        <Picker.Item label={item.NamaCuti} value={item.KodeCuti} key={key} />)
                                        )}
                            </Picker>
                            <Text>Keperluan :</Text>
                            <Picker
                                style={{height:50, width:400, backgroundColor:colors.WHITE}}
                                selectedValue={this.state.kodeKeperluan}                    
                                onValueChange={(itemValue, itemIndex) => this.setState({kodeKeperluan: itemValue})} >                    
                                    {this.state.datasourceKeperluan.map((item, key)=>(
                                        <Picker.Item label={item.Keterangan} value={item.kode} key={key} />)
                                        )}
                            </Picker>
                            <Text>Deskripsi :</Text>
                            <TextInput style={{width:400, borderColor: 'white', borderWidth: 1}}
                                        placeholder="Deskripsi"/>
                            <Text>Tanggal Cuti :</Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.state.startdate}
                                mode="date"
                                placeholder="select date"
                                format="MM-DD-YYYY"
                                minDate="01-01-2013"
                                maxDate="12-31-2030"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: { position: 'absolute', left: 0,top: 4, marginLeft: 0 },
                                    dateInput: { marginLeft: 36 }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({startdate: date})}}
                            /> 
                            <Text>Sampai Dengan Tanggal :</Text>
                            <DatePicker
                                style={{width: 150}}
                                date={this.state.enddate}
                                mode="date"
                                placeholder="select date"
                                format="MM-DD-YYYY"
                                minDate="01-01-2013"
                                maxDate="12-31-2030"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: { position: 'absolute', left: 0,top: 4, marginLeft: 0 },
                                    dateInput: { marginLeft: 36 }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={(date) => {this.setState({enddate: date})}}
                            /> 
                            <Text>Durasi Cuti :</Text>
                            <TextInput style={{width:400, borderColor: 'white', borderWidth: 1}} placeholder="Durasi Cuti"/>
                            <Text>Sisa Cuti :</Text>
                            <TextInput style={{width:400, borderColor: 'white', borderWidth: 1}} placeholder="Sisa Cuti"/>
                            <Button text="Save" />
                        </ContainerView>
                
            </View>
        );
    }
}



const mapStateToProps = ( state ) => {
    return {   
      username:state.reducerUserInfo.username,
      nik:state.reducerUserInfo.nik,
      token: state.reducerLogin.token,
    };
  }

export default connect(mapStateToProps)(LeaveRequestScreen);