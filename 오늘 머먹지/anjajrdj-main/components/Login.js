import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import LoginScreen from '../Screen/LoginScreen';
import SignupScreen from '../Screen/SignupScreen';
import DrawerStackScreen from './DrawerStackScreen'

const AppNavigator = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    Main: DrawerStackScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const AppContainer = createAppContainer(AppNavigator);

const Login = () => {
  return <AppContainer />;
};

export default Login;
