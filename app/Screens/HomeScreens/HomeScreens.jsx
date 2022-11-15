import React from 'react';
import {
  View, Text, TouchableOpacity, Platform,
} from 'react-native';

export default function HomeScreens(props) {
  const { navigation } = props;
  return (
    <View>
      <Text>Hiển thị thông tin trang chủ</Text>
      <TouchableOpacity
        style={{
          marginTop: 80, width: 150, height: 50, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', alignItems: 'center',
        }}
        onPress={() => navigation.navigate('reactTest')}
      >
        <Text style={{ color: 'white' }}>Test na</Text>
      </TouchableOpacity>
    </View>
  );
}
