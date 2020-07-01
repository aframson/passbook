import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity, ActivityIndicator ,FlatList} from 'react-native';




export default class Collect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchRes: '',
      loading: false,
      search: '',
      is_ready:false
    }
  }



  search = () => {

    this.setState({ loading: true }, () => {


      fetch('http://ttgdata.brichghana.com/passbook/route.php?func=fetch_prod', {
        method: 'POST',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          search: this.state.search
        })

      }).then((res) => res.json()).then((JsonRes) => {


        console.log(JsonRes);

        this.setState({loading:false,searchRes:JsonRes,is_ready:true})


      })


    })


  }






  render() {

     const newMoney = 40;

    return (
      <View>
        <View style={styles.mage}>
          <TextInput style={styles.inp}
            placeholder="Search for Product details"
            onChangeText={(data) => this.setState({ search: data ,loading:false})}
          />
          <TouchableOpacity style={styles.imgt} onPress={() => this.search()}>
            {this.state.loading ? <ActivityIndicator size="large" color="#318f96" /> :
              <Image style={styles.imgs} source={require('../assets/send.png')} />}
          </TouchableOpacity>
        </View>

        <View>
          {this.state.is_ready?
            <FlatList 
              data={this.state.searchRes}
              renderItem={({item})=>(
                <View>
                 <View style={styles.cont}>
                     <Image style={styles.img}source={{uri:'http://tuatuagye.com/admin/admin/pages/forms/products/'+item.image}}/>
                     <Text style={styles.name} >{item.name}</Text>
                 </View>
                 <View><Text style={styles.price}>GHC { parseInt(item.price,10) + newMoney }</Text></View>
                 </View>
              )}
            />
          :<Text></Text>}
        </View>


      </View>
    );
  }


}

const styles = StyleSheet.create({
  price:{
     backgroundColor:'white',
     fontSize:20,
     padding:10,
     color:'green',
    //  position:'absolute'
    marginTop:-70,
    marginLeft:130

  },
  name:{
    fontSize:13,
    fontWeight:'bold',
    color:'gray',
    padding:10
  },
  cont:{
      flexDirection:'row',
      padding:10,
      backgroundColor:'white',
      borderBottomWidth:1,
      borderColor:'#d8d8d8'

  },
  img:{
     height:100,
     width:100,
     borderRadius:5
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
    backgroundColor: '#318f96'
  },
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
