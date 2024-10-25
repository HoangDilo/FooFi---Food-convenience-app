if (__DEV__) {
  require('./ReactotronConfig');
}

import React, {useCallback, useEffect} from 'react';
import MainNavigator from './src/navigation';
import {Provider, useDispatch} from 'react-redux';
import {store} from '@/store';
import {I18nextProvider} from 'react-i18next';
import StatusBarCustom from '@/components/StatusBarCustom';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import i18n from '@/localization/i18n';
import CustomToastMessage from '@/components/CustomToastMessage';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
  }, []);

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n} defaultNS={'translation'}>
        <GestureHandlerRootView style={{flex: 1}}>
          <SafeAreaProvider>
            <StatusBarCustom />
            <MainNavigator />
            <CustomToastMessage />
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>
  );
};

export default App;
