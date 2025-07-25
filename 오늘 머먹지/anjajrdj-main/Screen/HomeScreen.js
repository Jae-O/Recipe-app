import React from "react"
import {Button, View, Text, Image} from 'react-native'

const HomeScreen = (props)=>{

  return(
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>      
      <Image
       style = {{width:40, height:40}}
       source={require('../assets/home.png')} />         
    </View>
  )
}

export default HomeScreen;