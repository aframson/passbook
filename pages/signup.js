import React, { Component } from 'react';
import { StyleSheet, Text, View,TextInput,Image ,TouchableOpacity,ActivityIndicator,ScrollView} from 'react-native';
import Search from '../components/search'



export default class SignUp extends Component {
       constructor(props){
            super(props)
            this.state={
                cus_id:'',
                name:'',
                occupation:'',
                location:'',
                number:'',
                item_type:'',
                item:'',
                price:'',
                amount_paid:'',
                date_reg:new Date(),
                loading:false
            }
       }

       

     


     Register_user_det = () =>{


     const mainDate = this.state.date_reg.getMonth()+'/'+this.state.date_reg.getDate()+'/'+this.state.date_reg.getDay()
               
    this.setState({loading:true},()=>{
        
        fetch('http://ttgdata.brichghana.com/passbook/route.php?func=Register_user',{
            method:'POST',
            headers:
            {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({

              cus_id:this.state.cus_id,
              name:this.state.name,
              occupation:this.state.occupation,
              location:this.state.location,
              number:this.state.number,
              item_type:this.state.item_type,
              item:this.state.item,
              price:this.state.price,
              amount_paid:this.state.amount_paid,
              date_reg:mainDate,
              person:this.props.data.name

            })
  
        }).then((res)=>res.json()).then((JsonRes)=>{

           
            
                 
            // console.log(JsonRes[0])
            if (JsonRes[0] == 'done') {
                  alert("Registration Successfull")
            }

           

          this.setState({loading:false})
  
        }).catch((error)=>{
                 alert("Registration Successfull");
        })
     
  
  
  })

     }











    render(){
      return (
       <View style={styles.container}>
       

          <ScrollView>

              <View style={styles.regbox}>
                 <Text style={{fontWeight:'bold',fontSize:20,color:'white',marginLeft:5}}>User Info</Text>
                 <TextInput style={styles.inp}
                     placeholder="Customer Id ..."
                     onChangeText={(data)=>{this.setState({cus_id:data})}}
                 />
                  <TextInput style={styles.inp}
                     placeholder="Name ..." 
                     onChangeText={(data)=>{this.setState({name:data})}}
                 />
                  <TextInput style={styles.inp}
                     placeholder="Location ..."  
                     onChangeText={(data)=>{this.setState({location:data})}}
                 />
                  <TextInput style={styles.inp}   
                     placeholder="Phone Number ..."
                     onChangeText={(data)=>{this.setState({number:data})}}
                    //  keyboardType={'numeric'}
                 />
                  <TextInput style={styles.inp}
                     placeholder="Occupation ..."
                     onChangeText={(data)=>{this.setState({occupation:data})}}
                 />
              </View>

              <View style={styles.regbox}>
                 <Text style={{fontWeight:'bold',fontSize:20,color:'white',marginLeft:5}}>Item</Text>
                 <TextInput style={styles.inp}
                     placeholder="Item Type..."
                     onChangeText={(data)=>{this.setState({item_type:data})}}
                 />
                  <TextInput style={styles.inp}
                     placeholder="Product Name ..."
                     onChangeText={(data)=>{this.setState({item:data})}}
                 />
                  <TextInput style={styles.inp}
                     placeholder="Price of the Product ..."
                     onChangeText={(data)=>{this.setState({price:data})}}
                 />
                
              </View>

              <View style={styles.regbox}>
                 <Text style={{fontWeight:'bold',fontSize:20,color:'white',marginLeft:5,marginTop:5}}>Amount Paid</Text>
                 <TextInput style={styles.inp}
                     placeholder="Item Type..."
                     onChangeText={(data)=>{this.setState({amount_paid:data})}}
                 />
             
             
             
               
              </View>  
              <View style={styles.regbox}>
                <TouchableOpacity style={styles.submitt} onPress={()=>this.Register_user_det()} >
                    <Text style={styles.submit}>Submit</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

       </View>
      );
    }

 
}

const styles = StyleSheet.create({
    submit:{
      color:'white',
      alignSelf:'center'
    },
    submitt:{
       padding:10,
       backgroundColor:'#1a6166',
       height:40,
       width:'100%',
       borderRadius:10
    },
    inp:{
        // borderWidth:1,
        borderColor:'gray',
        padding:10,
        borderRadius:5,
        marginTop:10,
        backgroundColor:'white'
    },
    regbox:{
        // borderWidth:1,
        // borderBottomWidth:1,
        height:'auto',
        width:'90%',
        alignSelf:'center',
        marginTop:20,
        padding:15,
        zIndex:30000
        // borderBottomColor:'#318f96'
    },
  container: {
    flex: 1,
    backgroundColor: '#318f96',
  },
});
