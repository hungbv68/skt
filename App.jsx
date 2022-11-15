import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import AppLoading from 'expo-app-loading';
import Index from './app/index';
import { initStore } from './app/redux/store';

export default function App() {
  const [store, setStore] = useState(null);
  const [doneInit, setDoneInit] = useState(false);

  let app = (
    <AppLoading
      startAsync={async () => {
        const result = await initStore();
        setStore(result.store);
      }}
      onFinish={() => {
        setDoneInit(true);
      }}
      onError={console.error}
    />
  );
  if (doneInit) {
    app = (
      <Provider store={store}>
        <Index />
      </Provider>
    );
  }
  return (app);
}
