import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface LoadingScreenProps {
  color?: string
}
const LoadingScreen: React.FC<LoadingScreenProps> = ({color='#fff'}) => {
  return (
    // You can customize the loading screen UI here
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={color}/>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
