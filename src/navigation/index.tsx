import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';

const AppStack: React.FC = () => {
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {false ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default AppStack;
