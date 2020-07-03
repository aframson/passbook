import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator,FlatList } from 'react-native';




export default class Collect extends Component {

  constructor(props) {
    super(props)
    this.state = {
      greeting: '',
      loading:false,
      search:'',
      search_results:'',
      is_ready:false,
      update_price:'',
      cus_id:'',
      name_of:'',
      date:new Date()
    }

  }

  componentDidMount() {
    this.greet();
  }







  update_price  = () =>{
         
       
    this.setState({loading:true},()=>{

     const mainDate = this.state.date.getMonth()+'/'+this.state.date.getDate()+'/'+this.state.date.getDay()
        
      fetch('http://ttgdata.brichghana.com/passbook/route.php?func=update_user_info',{
          method:'POST',
          headers:
          {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            update:this.state.update_price,
            cus_id:this.state.cus_id,
            name:this.state.name_of,
            date:mainDate
          })

      }).then((res)=>res.json()).then((JsonRes)=>{   
               
              // console.log(JsonRes[0])
              if (JsonRes[0] == 'done') {
                fetch('http://tuatuagye.com/hubtelsms/collection?amount='+this.state.update_price+'&customerID='+this.state.cus_id).then((res)=>res.json()).then((JsonRes)=>{
                  // console.log(JsonRes)
               })
                    alert("UPDATED SUCCESSFULLY !!!")
                   
              }

                    this.setState({loading:false})

      })
   


})
         
      

  }
 
      
  fetch_det = () =>{

      this.setState({loading:true},()=>{
        
            fetch('http://ttgdata.brichghana.com/passbook/route.php?func=fetch_user_det',{
                method:'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                   search:this.state.search,
                })

            }).then((res)=>res.json()).then((JsonRes)=>{
                      // console.log(JsonRes);
                      this.setState({search_results:JsonRes,is_ready:true,loading:false})

            })
         


      })
         

  }






  greet = () => {

    var myDate = new Date();
    var hrs = myDate.getHours();

    var greet;

    if (hrs < 12) {
      greet = 'Good Morning';

    } else if (hrs >= 12 && hrs <= 17) {
      greet = 'Good Afternoon';

    } else if (hrs >= 17 && hrs <= 24) {
      greet = 'Good Evening';

    }

    this.setState({ greeting: greet })

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mname}>{this.state.greeting} {this.props.data.name}</Text>

        <View style={styles.mage}>
          <TextInput style={styles.inp}
            placeholder="Enter customer id"
            onChangeText={(data)=>this.setState({search:data,loading:false})}
          />
          <TouchableOpacity style={styles.imgt} onPress={()=>this.fetch_det()}>
            {this.state.loading?<ActivityIndicator size="large" color="#318f96"/>:
            <Image style={styles.imgs} source={require('../assets/send.png')} />}
          </TouchableOpacity>
        </View>
        
        <View>
           {this.state.is_ready?
             <FlatList
                data ={this.state.search_results}
                renderItem={({item})=>(
                 
                     <View style={styles.contain}>
                        <View style={styles.section}>
                             <Text style={styles.redy}><Text style={styles.iden}>Customer Name :</Text> {item.name}</Text>
                        </View>
                    
                        <View style={styles.section}>
                              <Text style={styles.redy}><Text style={styles.iden}>Location :</Text>{item.location}</Text>
                        </View>
                   
                        <View style={styles.section}>
                              <Text style={styles.redy}><Text style={styles.iden}>Telephone :</Text>{item.phone_number}</Text>
                        </View>
                
                        <View style={styles.section}>
                             <Text style={styles.redy}><Text style={styles.iden}>Item Type :</Text> {item.item_type}</Text>
                        </View>
                   
                        <View style={styles.section}>
                              <Text style={styles.redy}><Text style={styles.iden}>Item  :</Text> {item.item}</Text>
                        </View> 
                 
                        <View style={styles.section}>
                              <Text style={styles.redy}><Text style={styles.iden}>Item Price :</Text> {item.price}</Text>
                        </View>
                      
                        <View style={styles.section}>
                              <Text style={styles.redy}><Text style={styles.iden}>Date Registered :</Text> {item.date_initiated}</Text>
                        </View>
                             
                        <View style={styles.section}>
                             <Text style={styles.redy}><Text style={styles.iden}>Money Left :</Text>  {(item.price - item.amount_paid)}</Text>
                        </View>
                
                        <View style={styles.section}>
                             <TextInput style={styles.inp}
                               placeholder="Enter recent amount paid.."
                               onChangeText={(data)=>this.setState({update_price:data,cus_id:item.cus_id,name_of:this.props.data.name})}
                             />
                             <TouchableOpacity style={styles.subb} onPress={()=>this.update_price()}>
                                <Text style={styles.stxt}>Update Infomation</Text>
                             </TouchableOpacity>
                        </View>
                        <View style={{height:300,width:'100%',backgroundColor:'white'}}></View>
                     </View>
                    
                )}

             />
           :
           <Text></Text>
           }
        </View>

      </View>
    );
  }


}

const styles = StyleSheet.create({
  stxt:{
     color:'white',
     textAlign:'center'
  },
  subb:{  
     height:40,
     width:'100%',
     backgroundColor:'#318f96',
     padding:10,
     borderRadius:5
  },
  iden:{
     color:'#318f96'
  },
  redy:{
      color:'gray'
  },
  section:{
     padding:10,
     borderWidth:1,
     borderColor:'#d8d8d8',
     marginTop:5,
     borderRadius:5
  },
  contain:{
    //  borderWidth:1,
     width:'90%',
     alignSelf:'center',
     padding:10,
     marginTop:10,
     backgroundColor:'white',
     borderRadius:10,
     height:'100%'
     
  },
  mname: {
    fontSize: 20,
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    fontWeight: 'bold',
    color:'gray'
  },
  imgs: {
    height: null,
    width: null,
    flex: 1
  },
  imgt: {
    //  borderWidth:1,
    padding: 10,
    marginLeft: 10,
    borderRadius: 50,
    height: 50,
    width: 50,
    //  backgroundColor:''
  },
  inp: {
    //  borderWidth:1,
    width: '80%',
    padding: 10,
    borderRadius: 40,
    backgroundColor: 'white'
  },
  mage: {
    //  borderWidth:1,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#dddddd'
  },
  container: {
    flex:1,
    backgroundColor:'#318f96'
  },
});
