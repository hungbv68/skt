import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ConfigScreen from '../configScreens';
// Navigator
import BottomTabNavigator from './bottomTabNavigator';
// authen
import LoginScreen from '../Screens/AuthScreens/loginScreen';
import RegisterScreen from '../Screens/AuthScreens/registerScreen';

import ReactTest from './reacttest';

const MainStack = createStackNavigator();

export default function IndexNavigator() {
  // const { navigation } = props;
  // const dispatch = useDispatch();
  return (
    <MainStack.Navigator initialRouteName={ConfigScreen.indexNavigation.BottomTabNavigator}>
      <MainStack.Screen
        name={ConfigScreen.indexNavigation.BottomTabNavigator}
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={ConfigScreen.auth.loginScreen}
        component={LoginScreen}
        options={{
          title: 'Đăng nhập',
          headerStyle: {
            height: 60,
          },
          headerTitleAlign: 'center',
        }}
      />
      <MainStack.Screen
        name="reactTest"
        component={ReactTest}
        options={{
          headerShown: false,
        }}
      />
      <MainStack.Screen
        name={ConfigScreen.auth.registerScreen}
        component={RegisterScreen}
        options={{
          title: 'Đăng ký',
          headerStyle: {
            height: 60,
          },
          headerTitleAlign: 'center',
        }}
      />
    </MainStack.Navigator>
  );
}
