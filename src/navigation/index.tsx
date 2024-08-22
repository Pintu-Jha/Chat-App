import React from 'react';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import MainStack from './MainStack';
import AuthStack from './AuthStack';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import { navigationRef } from '../NavigationServies';

const AppStack: React.FC = () => {
  const AuthUserDetails = useSelector((state: RootState) => state?.auth);
  return (
    <View style={{flex: 1}}>
      <NavigationContainer ref={navigationRef}>
        {!!AuthUserDetails.isLogging ? <MainStack /> : <AuthStack />}
      </NavigationContainer>
    </View>
  );
};

export default AppStack;
