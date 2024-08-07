import React from 'react';
import navigationString from './navigationString';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Screen from '../screens/index';
import bottomTabs from './bottomTabs';

export type MainRootStackParams = {
  [navigationString.BOTTON_TAB_BAR]: undefined;
  [navigationString.GetAvailableUser]: undefined;
  [navigationString.CHAT_SCREEN]: {id: string};
};
const Stack = createNativeStackNavigator<MainRootStackParams>();

const MainStack: React.FC = () => {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          presentation: 'modal',
          animation: 'slide_from_right',
          animationTypeForReplace: 'push',
        }}>
        <Stack.Screen
          name={navigationString.BOTTON_TAB_BAR}
          component={bottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationString.GetAvailableUser}
          component={Screen.GetAvailableUser}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationString.CHAT_SCREEN}
          component={Screen.ChatComponents}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
