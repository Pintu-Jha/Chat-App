import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import * as Screen from '../screens/index';
import navigationString from './navigationString';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name={navigationString.MESSAGE_SCREEN}
          component={Screen.messageScreen}
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
        <Stack.Screen
          name={navigationString.Profile_Screen}
          component={Screen.ProfileScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationString.NewGroup_Screen}
          component={Screen.NewGroup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationString.NewGroupColum_Screen}
          component={Screen.NewGroupColum}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={navigationString.GroupChatDetailsScreen}
          component={Screen.GroupChatDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainStack;
