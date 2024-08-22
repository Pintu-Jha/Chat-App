import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';

type WapperContainerProps = {
  style?: ViewStyle;
  children: ReactNode;
};

const WapperContainer = ({style, children}: WapperContainerProps) => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'gray'} />
      <View
        style={{
          ...styles.container,
          ...style,
        }}>
        {children}
      </View>
    </SafeAreaView>
    //
  );
};

export default WapperContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
    opacity: 1,
  },
});
