import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Login from './components/Login'


export default function App() {
  return (             
   <NavigationContainer>
   <Login/>    
   </NavigationContainer>     
  )
}
