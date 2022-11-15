import React from 'react';
import {
  View, Text, TouchableOpacity, Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Application from 'expo-application';
import configScreens from '../../configScreens';
import { logout } from '../../redux/actionCreator/auth-action-creator';
import getKeyApiForApp from '../../api/axios-no-auth';

export default function AccountScreens(props) {
  const { navigation } = props;
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.auth);
  // const { installationId } = Constants;
  const abc = async () => {
    let id;
    if (Platform.OS === 'ios') {
      id = Application.getIosIdForVendorAsync();
    } else {
      id = Application.androidId;
    }
    alert(id);
    const apiKeyConnect = await getKeyApiForApp();
    console.log(apiKeyConnect);
  };
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Text>
        Thông tin tai khoảng
        {Application.applicationId}
        {'          '}
        {/* {installationId} */}
      </Text>
      {
        !isLogin ? (
          <TouchableOpacity
            style={{
              marginTop: 80, width: 150, height: 50, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', alignItems: 'center',
            }}
            onPress={() => navigation.navigate(configScreens.auth.loginScreen)}
          >
            <Text style={{ color: 'white' }}>Đăng nhập</Text>
          </TouchableOpacity>
        )
          : (
            <TouchableOpacity
              style={{
                marginTop: 80, width: 150, height: 50, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', alignItems: 'center',
              }}
              onPress={() => dispatch(logout())}
            >
              <Text style={{ color: 'white' }}>Đăng Xuất</Text>
            </TouchableOpacity>
          )
      }
      <TouchableOpacity
        style={{
          marginTop: 80, width: 150, height: 50, backgroundColor: 'blue', borderRadius: 10, justifyContent: 'center', alignItems: 'center',
        }}
        onPress={() => {
          abc();
        }}
      >
        <Text style={{ color: 'white' }}>Add api</Text>
      </TouchableOpacity>
    </View>
  );
}
