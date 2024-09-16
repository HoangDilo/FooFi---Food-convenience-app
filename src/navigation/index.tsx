import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STACK} from '../constants/screens.constant';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';

type RootStackParamList = {
  "main_tab": undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={STACK.MAIN_TAB as "main_tab"} component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
