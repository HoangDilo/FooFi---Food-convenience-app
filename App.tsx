import {StyleSheet} from 'react-native';
import React from 'react';
import MainNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from '@/store';
import StatusBarCustom from '@/components/StatusBarCustom';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBarCustom />
      <MainNavigator />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
