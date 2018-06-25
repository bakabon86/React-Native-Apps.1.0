import baseUrl from './baseUrl';

export const checkToken = (tkn) => {
    //var url ='https://mas.agungsedayu.com:8888/hr/CheckToken?token='+ tkn
    var url = baseUrl + 'CheckToken?token=' + tkn
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
           return responseJson
        }
        else{
            console.log('token expired')            
            alert("Token expired, Please Login again!")
            return null
            // this.props.navigation.navigate('Login')
        }        
    });
}