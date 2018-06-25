import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,FlatList,ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';

import { Button } from '../components';
import index from '../store';
import { colors } from '../utils/constants';
import Table from 'react-native-simple-table';

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

var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

const columns = [
    {
      title: 'Tanggal',
      dataIndex: 'Tanggal',
      width: 100
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      width: 100
    },
    {
      title: 'Keterangan',
      dataIndex: 'Keterangan',
      width: 120
    },
    {
      title: 'Jumlah',
      dataIndex: 'Jumlah',
      width: 60
    },
    {
      title: 'Saldo',
      dataIndex: 'Saldo',
      width: 60
    },
  ];

class LeaveUsageHistoryListScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
        startdate : (month + '-' + date + '-' + year) , 
        enddate : (month + '-' + date + '-' + year) , 
        saldoCuti : 0,
        }
    }

    componentWillMount=()=>{
    
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
                  this.getLeaveUsageData();                
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

      getLeaveUsageData = () =>{

        var url ='https://mas.agungsedayu.com:8888/hr/GetLeaveData?token='+ this.props.token 
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
                 datasource : responseJson.data
               })
              console.log(responseJson.data)
              items = responseJson.data
              }
              else{
                console.log('Leave data could not be found')            
                alert("Leave Data not Found!, Please Retry!")
                //this.props.navigation.navigate('Login')
              }        
          });
      }

      render() {

        return(
        <View  style={{flex : 1 ,paddingTop:Constants.statusBarHeight}}>
            <ContainerView>
            <TitleText>Leave Usage History List</TitleText>
                <Text>{this.props.nik} - {this.props.username}</Text> 
                <Text>Sisa Saldo Cuti :{this.state.saldoCuti}</Text>
                        
                    <View style={styles.container}>
                        <Text style={styles.title}>Leave Usage History List</Text>
                        <Table height={640} columnWidth={60} columns={columns} dataSource={this.state.datasource} />
                    </View>
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

export default connect(mapStateToProps)(LeaveUsageHistoryListScreen);

const styles = StyleSheet.create({
    container: { flex: 3, padding: 16, paddingTop: 30, backgroundColor: colors.BLUE_50 },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' }
  });