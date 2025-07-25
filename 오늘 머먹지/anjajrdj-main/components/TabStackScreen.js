import {View,Image} from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from "@react-navigation/stack"
import HomeScreen from "../Screen/HomeScreen";
import UserScreen from "../Screen/UserScreen"
import AboutScreen from "../Screen/AboutScreen";
import { NavigationContainer } from '@react-navigation/native';
import LogoTitle from "./LogoTitle";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabIcon = ({ name, size, color }) => {
    return <MaterialCommunityIcons name={name} size={size} color={color} />;
};

const TabStack = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const UserStack = createStackNavigator();
const AboutStack = createStackNavigator();

const HomeStackScreen = ()=>{
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: "Home 화면",
        headerShown: false,
      }}/>
    </HomeStack.Navigator>
  )
}

const UserStackScreen = ()=>{
  return (
    <UserStack.Navigator>
      <UserStack.Screen 
      name="Main" 
      component={UserScreen}
      options={{
        headerShown: false,
      }}/>
    </UserStack.Navigator>
  )
}

const AboutStackScreen = ()=>{
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen 
      name="About" 
      component={AboutScreen}
      options={{
        title: "About 화면",
        headerShown: false,
      }}/>
    </AboutStack.Navigator>
  )
}

const TabStackScreen = () => {
  return (
    <TabStack.Navigator
     initialRouteName='Main'
            screenOptions={({ route }) => ({
                tabBarIcon: props => {
                    let name = '';
                    if (route.name === 'Home') name = 'github';
                    else if (route.name === 'Main') name = 'home';
                    else name = 'cog';
                    return TabIcon({...props, name});
                },
            })}
    >    
      
      <TabStack.Screen name="Home" component={HomeStackScreen}/>   
      <TabStack.Screen name="Main" component={UserStackScreen} />
      <TabStack.Screen name="About" component={AboutStackScreen} />
    </TabStack.Navigator>
  );
}


export default TabStackScreen;