import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actionCreator/auth-action-creator';
import configScreens from '../../configScreens';

export default function loginScreen(props) {
  const { navigation } = props;
  const [value, onChangeText] = useState({ username: 'khotrithucso@gmail.com', password: '123456' });
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  useEffect(() => {
    if (isLogin) {
      Alert.alert(
        'Thông báo',
        'Đăng nhập thành công, cảm ơn bạn đã sử dụng hệ thông ktts',
      );
      navigation.navigate(configScreens.home.HomeScreen);
    }
    return () => {
      console.log('aaaaaaaaaaaa');
    };
  }, [isLogin]);
  return (
    <View>
      <View style={{
        width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50,
      }}
      >
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={{
            width: '80%', height: 50, backgroundColor: 'white', borderWidth: 1,
          }}
          onChangeText={(text) => onChangeText({ ...value, username: text })}
          value={value.username}
        />
      </View>
      <View style={{
        width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50,
      }}
      >
        <TextInput
          placeholder="Mật khẩu"
          keyboardType="email-address"
          style={{
            width: '80%', height: 50, backgroundColor: 'white', borderWidth: 1,
          }}
          onChangeText={(text) => onChangeText({ ...value, password: text })}
          value={value.password}
        />
      </View>
      <View style={{
        width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: 50,
      }}
      >
        <TouchableOpacity
          style={{
            width: '80%', height: 50, backgroundColor: 'blue', borderWidth: 1, justifyContent: 'center', alignItems: 'center',
          }}
          onPress={() => {
            dispatch(login(value.username, value.password));
          }}
        >
          <Text> Đăng nhập </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
