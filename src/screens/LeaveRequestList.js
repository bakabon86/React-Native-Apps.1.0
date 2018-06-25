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
import Table from 'react-native-simple-table'; //tabel
import ActionButton from 'react-native-action-button'; //floating action button
import Icon from 'react-native-vector-icons/Ionicons'; //iconpacks
//import LeaveRequestScreen from './LeaveRequest';

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
//setup picker
var myear=[] 
   for(var i = year - 5; i<=year; i++)
   {
   		myear.push(i);
   } 
//setup table
const columns = [
    {
      title: 'Tanggal Pengajuan',
      dataIndex: 'TanggalPengajuan',
      width: 100
    },
    {
      title: 'Tanggal Mulai',
      dataIndex: 'TanggalMulai',
      width: 100
    },
    {
      title: 'Tanggal Selesai',
      dataIndex: 'TanggalSelesai',
      width: 100
    },
    {
      title: 'Jumlah Cuti',
      dataIndex: 'JumlahCuti',
      width: 60
    },
    {
      title: 'Kode Cuti',
      dataIndex: 'KodeCuti',
      width: 60
    },
  ];



class LeaveRequestListScreen extends Component{

    constructor(props){
        super(props)
        this.state = {
        startyear : year , 
        endyear :  year , 
        services: myear,//['2016','2017','2018','2019','2020','2021','2022','2023','2024','2025'],
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

      getLeaveRequestData = (yearFrom,yearTo) =>{

        var url ='https://mas.agungsedayu.com:8888/hr/GetLeaveRequest?token='+ this.props.token +
                    '&param1=' + yearFrom + '&param2=' +yearTo
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

        // var srvItems = []; 
        // for (var i = 0; i < this.state.services.length; i++) 
        // {   s = this.state.services[i]; 
        //     srvItems.push(<Picker.Item key={i} value={s} label={s} />); }
            //isi picker
            let serviceItems = this.state.services.map( (s, i) => {
                return <Picker.Item key={i} value={s.toString()} label={s.toString()} />
            });
    

        return(
        <View  style={{flex : 1 ,paddingTop:Constants.statusBarHeight}}>
            <ContainerView>
            <TitleText>Leave Request List</TitleText>
                <Text>{this.props.nik} - {this.props.username}</Text> 
                <Text>Sisa Saldo Cuti :{this.state.saldoCuti}</Text>
                <Text>Begin Date : </Text>
                {/* <DatePicker
                  style={{width: 150}}
                  date={this.state.startyear}
                  mode="date"
                  placeholder="select date"
                  format="YYYY"
                  minDate="2016"
                  maxDate="2030"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({startyear: date})}}
                /> */}
                <Picker
                    selectedValue={this.state.startyear.toString()}
                    style={{ height: 50, width: 150, backgroundColor: colors.WHITE }}
                    onValueChange={(service) => this.setState({startyear: service})}>
                        {serviceItems}
                </Picker>
                <Text>End Date : </Text>
                {/* <DatePicker
                  style={{width: 150}}
                  date={this.state.endyear}
                  mode="date"
                  placeholder="select date"
                  format="YYYY"
                  minDate="2016"
                  maxDate="2030"
                  confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0
                    },
                    dateInput: {
                      marginLeft: 36
                    }
                    // ... You can check the source to find the other keys.
                  }}
                  onDateChange={(date) => {this.setState({endyear: date})}}
                /> */}
                <Picker
                    selectedValue={this.state.endyear.toString()}
                    style={{ height: 50, width: 150, backgroundColor: colors.WHITE }}
                    onValueChange={(itemValue, itemIndex) => this.setState({endyear: itemValue})}>
                         {serviceItems}
                </Picker>
                <ButtonContainer> 
                    <Button text="View Attendance List" onPress = {()=>
                        { this.setState({datasource:[]})
                            this.getLeaveRequestData(this.state.startyear,this.state.endyear)    
                                                
                        }}
                    />
                </ButtonContainer>        
                    <View style={styles.container}>
                        <Text style={styles.title}>Leave Request List</Text>
                        <Table height={480} columnWidth={60} columns={columns} dataSource={this.state.datasource} />
                    </View>
            </ContainerView> 
            {/* //actionbutton  area */}
            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="New Task" onPress={() =>{
                                    this.props.navigation.navigate('LeaveRequestScreen');                               
                                    console.log("notes tapped!")}}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                {/* <ActionButton.Item buttonColor='#3498db' title="Notifications" onPress={() => {}}>
                    <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#1abc9c' title="All Tasks" onPress={() => {}}>
                    <Icon name="md-done-all" style={styles.actionButtonIcon} />
                </ActionButton.Item> */}
            </ActionButton>   
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

export default connect(mapStateToProps)(LeaveRequestListScreen);

const styles = StyleSheet.create({
    container: { flex: 3, padding: 16, paddingTop: 30, backgroundColor: colors.BLUE_50 },
    header: { height: 50, backgroundColor: '#537791' },
    text: { textAlign: 'center', fontWeight: '100' },
    dataWrapper: { marginTop: -1 },
    row: { height: 40, backgroundColor: '#E7E6E1' },
    actionButtonIcon: { fontSize: 20, height: 22, color: 'white', },
  });