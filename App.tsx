import {StyleSheet} from 'react-native';
import React from 'react';
import MainNavigator from './src/navigation';
import {Provider} from 'react-redux';
import {store} from '@/store';
import {I18nextProvider} from 'react-i18next';
import StatusBarCustom from '@/components/StatusBarCustom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from '@/localization/i18n';

const App = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBarCustom />
          <MainNavigator />
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
