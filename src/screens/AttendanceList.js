import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,FlatList,ScrollView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { FormattedWrapper, FormattedMessage } from 'react-native-globalize';

import { Button } from '../components';
import index from '../store';

//import  GridView  from 'react-native-super-grid';
//import { DataGrid } from 'react-native-data-grid';
//import Model from '../components/AttendanceListGrid.json'
//import { Table, TableWrapper, Row, } from 'react-native-table-component';
//import DataTable from 'react-native-data-table';
import Table from 'react-native-simple-table';
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
const items=[];
var date = new Date().getDate();
var month = new Date().getMonth() + 1;
var year = new Date().getFullYear();

const columns = [
  {
    title: 'Tanggal Masuk',
    dataIndex: 'TanggalMasuk',
    width: 100
  },
  {
    title: 'Jam Masuk',
    dataIndex: 'JamMasuk',
    width: 100
  },
  {
    title: 'Tanggal Keluar',
    dataIndex: 'TanggalKeluar',
    width: 100
  },
  {
    title: 'Jam Keluar',
    dataIndex: 'JamKeluar',
    width: 100
  },
  {
    title: 'Keterangan Kerja',
    dataIndex: 'KeteranganKerja',
    width: 100
  },
];

class AttendanceListScreen extends Component{
 
  constructor(props){
    super(props)
    this.state = {
      startdate : (month + '-' + date + '-' + year) , 
      enddate : (month + '-' + date + '-' + year) , 
      // noinduk :'',
      // nama : '',
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
            //this.getNamaNikStatus();            
            //console.log(this.state.noinduk)
          }
          else{
            console.log('token expired')            
            alert("Token expired, Please Login again!")
            this.props.navigation.navigate('Login')
          }        
      });

      // const {nomorindukkaryawan} = index.getState()
      // this.setState({nomorindukkaryawan}) 
  }

 
  // getNamaNikStatus=()=>{
    
  //   var url ='https://mas.agungsedayu.com:8888/hr/GetUserInfo?token='+ this.props.token 
  //   console.log("URL=" +url)
  //   return fetch(url)
  //     .then((response) =>{
  //       if(response.status===404){
  //         return {status:false,token:"Null"}
  //       }
  //       else{
  //         return response.json()
  //       }

  //     }) 
  //     .then((responseJson) => {              
  //         if (responseJson.status===true){      
              
  //          this.setState(
  //            {
  //              noinduk: responseJson.data.NIK,
  //              nama:responseJson.data.Name,
  //              status:responseJson.status,
  //             }
  //          );
  //          //this.props.navigation.navigate('Main')
  //         }
  //         else{
  //           console.log('user not found')            
  //           alert("User not Found!, Please Login again!")
  //           //this.props.navigation.navigate('Login')
  //         }        
  //     });
  // }

getAttendanceData = (since,until) =>{

  var url ='https://mas.agungsedayu.com:8888/hr/GetAttendanceData?token='+ this.props.token + 
            '&since=' + since + '&until=' + until
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
        //console.log(responseJson.data)
        items = responseJson.data
        }
        else{
          console.log('Attendance data could not be found')            
          alert("Data not Found!, Please Retry!")
          //this.props.navigation.navigate('Login')
        }        
    });
}

render() {

   return(
    <View  style={{flex:1,paddingTop:Constants.statusBarHeight}}>
      <ContainerView >
        <TitleText>Attendance List</TitleText>
        
            <Text>{this.props.nik} - {this.props.username}</Text> 
            <Text>Begin Date : </Text>
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
                  onDateChange={(date) => {this.setState({startdate: date})}}
            />
            <Text>End Date : </Text>
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
                  onDateChange={(date) => {this.setState({enddate: date})}}
            />
          <ButtonContainer> 
            <Button text="View Attendance List" onPress = {()=>
                  { this.setState({datasource:[]})
                    this.getAttendanceData(this.state.startdate,this.state.enddate)    
                                        
                  }}
            />
          </ButtonContainer>
      
          {/* <FlatList
                      data={this.state.datasource}
                      extraData={this.state.datasource}
                      renderItem={({item}) => <Text>{item.TanggalMasuk},{item.JamMasuk},
                                                    {item.TanggalKeluar},{item.JamKeluar},{item.KeteranganKerja}
                                              </Text>
                                  }
                      keyExtractor={(item, index) => ''+index}
                  /> */}
      
        <View style={styles.container}>
          <Text style={styles.title}>Attendance List</Text>
          <Table height={480} columnWidth={60} columns={columns} dataSource={this.state.datasource}  />
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

export default  connect(mapStateToProps)(AttendanceListScreen);

const styles = StyleSheet.create({
  container: { flex: 3, padding: 16, paddingTop: 30, backgroundColor: colors.BLUE_50 },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' }
});