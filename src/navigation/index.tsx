import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {STACK} from '../constants/screens.constant';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={STACK.MAIN_TAB} component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
