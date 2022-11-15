import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import ConfigScreens from '../configScreens';
// import compenents
import HomeScreen from '../Screens/HomeScreens/HomeScreens';
import AccountScreen from '../Screens/AccountScreens/AccountScreens';

const BottomTab = createBottomTabNavigator();

export default function HomeNavigator(props) {
  return (
    <BottomTab.Navigator
      initialRouteName={ConfigScreens.home.HomeScreen}
      tabBarOptions={{
        activeTintColor: 'red',
        inactiveTintColor: 'black',
        style: {
          backgroundColor: 'white',
          height: 60,
        },
      }}
    >
      <BottomTab.Screen
        name={ConfigScreens.home.AccountScreens}
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bullseye-arrow" size={size} color={color} style={{ marginBottom: 3 }} />
          ),
          title: 'tài khoản',
          // tabBarBadge: 3,
        }}
      />
      <BottomTab.Screen
        name={ConfigScreens.home.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bullseye-arrow" size={size} color={color} style={{ marginBottom: 3 }} />
          ),
          title: 'tài khoản',
          // tabBarBadge: 3,
        }}
      />

    </BottomTab.Navigator>
  );
}
