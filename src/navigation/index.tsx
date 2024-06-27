import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AppStack: React.FC = () => {
  const isLogging = useSelector((state:RootState  )=>state?.auth?.success)
  
  return (
    <View style={{flex: 1}}>
      <NavigationContainer>
        {!!isLogging ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default AppStack;
