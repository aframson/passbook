import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,Image ,TouchableOpacity,ActivityIndicator,ScrollView,KeyboardAvoidingView} from 'react-native';
import url from '../url'


export default class Login extends Component {
                  constructor(props){
                       super(props)
                       this.state={
                           uname:'',
                           pass:'',
                           load:false
                       }
                  }




     login = () =>{
        
           this.setState({load:true},()=>{

                  fetch('http://ttgdata.brichghana.com/passbook/route.php?func=login',{
                    method:'POST',
                    headers: 
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                       uname:this.state.uname,
                       pass:this.state.pass
                    })

                  }).then((res)=>res.json()).then((JsonRes)=>{
                            // console.log(JsonRes[0].usr_name)
                            let name = JsonRes[0].usr_name;
                            let id = JsonRes[0].usr_id;
                            this.setState({load:false})
                            this.props.navigation.navigate('Dashboard',{name:name,id:id})
                  }).catch((error)=>{
                      alert('Incorrect Username or password !!!')
                  })
                         
           })

     }









    render(){
      return (

       <View style={styles.container}>
           <Image  source={require('../assets/bg.jpg')}/>
           <View style={{alignContent:'center',alignSelf:'center',marginTop:50,zIndex:2000,position:'absolute'}}>
            <Text style={styles.title}>Pass<Text style={styles.title2}>Book</Text></Text>
           </View>

         

           <View style={styles.logbox}>
                <TextInput
                    style={styles.inp}
                    placeholder="Enter Username..."
                    onChangeText={(data)=>this.setState({uname:data,load:false})}
                />
                 <TextInput  
                    style={styles.inp}
                    placeholder="Enter Password..."
                    onChangeText={(data)=>this.setState({pass:data,load:false})}

                />
                 <TouchableOpacity style={styles.loginbutt}
                   onPress={this.login}
                 >
                   
                    {this.state.load?<ActivityIndicator 
                    style={{position:'absolute',alignSelf:'center',marginTop:10}} size="small" color="white" />: <Text style={styles.logtxt}>Login</Text>}
                </TouchableOpacity>

               
           </View>

       <Text style={styles.footer}>Brich Company Limited &reg; 2020</Text>
       </View>

      );
    }

 
}

const styles = StyleSheet.create({
    logtxt:{
      color:'white',
      alignSelf:'center'
    },
    loginbutt:{
      backgroundColor:'#318f96',
      padding:10,
      width:'100%',
      marginTop:20,
      borderRadius:5,
      height:40
    },
    inp:{
      borderWidth:1,
      borderColor:'#318f96',
      padding:10,
      width:'100%',
      borderRadius:5,
      marginTop:20
     },
    footer:{
        color:'white',
        position:'absolute',
        marginTop:130,
        alignSelf:'center'
    },
    logbox:{
       height:'auto',
       width:'85%',
       backgroundColor:'white',
       position:'absolute',
       alignSelf:'center',
       alignItems:'center',
       marginTop:'50%',
       borderRadius:5,
       padding:10
    },
    title:{
        fontSize:40,
        fontWeight:'bold',
        color:'#318f96'
    },
    title2:{
        fontSize:40,
        fontWeight:'bold',
        color:'white'
    },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    height:'100%',
    width:'100%'
  },
});
