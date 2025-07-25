import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabStackScreen from './TabStackScreen'
import LogoTitle from './LogoTitle'
import LogoTitle2 from './LogoTitle2'
import LogoTitle3 from './LogoTitle3'



const Drawer = createDrawerNavigator();
const ImageStack = createDrawerNavigator();

const ImageStackScreen = ()=>{
    return(
      <ImageStack.Navigator>
        <ImageStack.Screen name ="image" component={ImageScreen}/>
      </ImageStack.Navigator>
    )
}


const CustomDrawer = ({navigation})=>{

  const goToStack = (stackName)=>{
    navigation.navigate(stackName)
  }
  return(
    <DrawerContentScrollView>
      <DrawerItem label = "Home"
      onPress = {()=> goToStack("Home")}
      icon = {LogoTitle}
    />
    <DrawerItem label = "User"
      onPress = {()=> goToStack("Main")}
      icon = {LogoTitle2}
    />
    <DrawerItem label = "About"
      onPress = {()=> goToStack("About")}
      icon = {LogoTitle3}
    />   
    <DrawerItem label = "Help"
      onPress = {()=>Linking.openURL('https://www.google.com')}   
    />
    <DrawerItem label = "Info"
    onPress = {()=> alert("Info")}
    />
    </DrawerContentScrollView>
  )
}


const DrawerStackScreen = ()=>{
    return(
      <Drawer.Navigator
      drawerPosition="right"  
      drawerContent={({navigation})=><CustomDrawer navigation={navigation}/>}    
    >
        <Drawer.Screen name ="Home" component={TabStackScreen}/>
        
      </Drawer.Navigator>
    )
}

export default DrawerStackScreen