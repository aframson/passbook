import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';


// eclistiastis 31-....

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
           loading:false,
           data:'',
           total:'',
           date: new Date()
        }
    }



 
    componentDidMount(){
        this.fetch_details()
        this.check_total()

      
    }

   fetch_details = () =>{

            this.setState({loading:true},()=>{
                
                
                   fetch('http://ttgdata.brichghana.com/passbook/route.php?func=fetchDetail',{
                    method:'POST',
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body:JSON.stringify({
                         name:this.props.data.name
                    })
          
                   }).then((res)=>res.json()).then((resJson)=>{

                          

                          this.setState({data:resJson});

                   })


            })

   }





   check_total  = () =>{
    

    const mainDate = this.state.date.getMonth()+'/'+this.state.date.getDate()+'/'+this.state.date.getDay()

    this.setState({loading:true},()=>{
                
                
        fetch('http://ttgdata.brichghana.com/passbook/route.php?func=Check_total',{
         method:'POST',
         headers: 
         {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
         },
         body:JSON.stringify({
              date:mainDate,
              name:this.props.data.name
         })

        }).then((res)=>res.json()).then((resJson)=>{

               

               this.setState({total:resJson});
               


        })


      })

   }



    render() {
        const now = new Date();
        const mainDate = now.getMonth()+'/'+now.getDate()+'/'+now.getDay()
        // {this.check_total()}
        
        return (
            <View>
                <Text style={styles.title}>
                Todays Transaction
                </Text>   
                <View style={styles.money}>
                    <Text style={styles.fig}>Total : GHC {}</Text>
                    <TouchableOpacity onPress={()=>{
                         this.fetch_details();
                         this.check_total()
                    }} style={styles.reload}><Text style={{color:'white'}}>Reload</Text></TouchableOpacity>
                </View>
                
                <FlatList
                    data={this.state.data}
                    renderItem={({item})=>(
                        <View>
                         {mainDate == item.now?  
                            <View style={styles.fed}>
                                  <Text style={styles.name}>{item.name}</Text>   
                                  <View style={styles.det}>
                                    <Text style={{color:'black'}}>Item:  {item.item}</Text> 
                                    <Text style={{color:'black'}}>Item Price : GHC {item.price}</Text> 
                                    <Text style={{color:'green'}}>Collected : GHC {item.amount_collected}</Text> 
                                    <Text style={{color:'blue'}}>Amount paid : GHC {item.amount_paid}</Text>
                                    <Text style={{color:'red'}}>Money Left : GHC {item.price-item.amount_paid}</Text>
                                           
                                  </View>
                            </View>      
                         :null}
                        </View>
                    )}
                />
            </View>
            )
    }

 
}

const styles = StyleSheet.create({
    reload:{
    //    borderWidth:1,
       padding:10,
       marginLeft:'30%',
       backgroundColor:'green',
       borderRadius:5
    },
            fig:{
               fontSize:25,
               color:'white',
            },
            money:{
                // borderWidth:1,
                padding:10,
                backgroundColor:'#1a6166',
                flexDirection:'row'
            },
            title:{
               fontSize:25,
               padding:10,
               color:'gray'
              
            },
            det:{
                // borderWidth:1,
                padding:10,
                backgroundColor:'#81dde4',
                borderRadius:5
            },
            fed:{
                // borderWidth:1,
                padding:10,
                // marginTop:-100 
                backgroundColor:'white',
                borderBottomColor:"gray",
                borderBottomWidth:1,
                
            },
            name:{
                fontSize:22,
                color:'#1a6166',
                padding:5
            }
});
