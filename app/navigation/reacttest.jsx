import * as React from 'react';
import { Button, View } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications111')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}
const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    <DrawerItemList {...props} />
    <DrawerItem
      label="Close drawer"
      onPress={() => (console.log('aaa'))}
    />
    <DrawerItem
      label="Toggle drawer"
      onPress={() => (console.log('aaa'))}
    //   onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  </DrawerContentScrollView>
);

const Drawer = createDrawerNavigator();

export default function reactTest() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home1111" component={HomeScreen} />
      <Drawer.Screen name="Notifications111" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
}
