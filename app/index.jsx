import React from 'react';
import {
  View, Text, Platform, StatusBar, SafeAreaView, StyleSheet,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
// navigator
import DrawerNavigator from './navigation/drawerNavigator';

const indexStyle = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
export default function Index() {
  return (
    <SafeAreaView style={indexStyle.AndroidSafeArea}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </SafeAreaView>

  );
}
