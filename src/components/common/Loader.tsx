import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface LoadingScreenProps {
  color?: string
}
const LoadingScreen: React.FC<LoadingScreenProps> = ({color='#000'}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} color={color}/>
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({});
