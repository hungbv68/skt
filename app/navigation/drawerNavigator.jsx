import * as React from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  // DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import IndexNavigator from './IndexNavigator';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => (
  <DrawerContentScrollView {...props}>
    {/* <DrawerItemList {...props} /> */}
    <DrawerItem
      label="Trang chủ"
      onPress={() => props.navigation.navigate('HomeScreen')}
    />
    <DrawerItem
      label="Tìm kiếm"
      onPress={() => props.navigation.navigate('AccountScreens')}
    //   onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
    />
  </DrawerContentScrollView>
);

export default function drawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="IndexNavigator"
        options={{ drawerLabel: 'Index Navigator' }}
        component={IndexNavigator}
      />
    </Drawer.Navigator>
  );
}
