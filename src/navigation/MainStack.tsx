import React from 'react';
import navigationString from './navigationString';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabs from './bottomTabs';

 type RootStackParams = {
  BottomTabs:undefined
};
const Stack = createNativeStackNavigator<RootStackParams>();

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
          name={navigationString.BOTTON_TAB_BAR as keyof RootStackParams}
          component={BottomTabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
