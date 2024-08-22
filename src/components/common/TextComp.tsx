import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {textScale} from '../../styles/responsiveStyles';

type TextContainerProps = {
  text?: string;
  style?: any;
  children?: ReactNode;
  onPress?: () => void;
};

const TextComp = ({
  text = '',
  style,
  children,
  onPress,
  ...props
}:TextContainerProps) => {
  return (
    <Text
      style={{
        ...styles.textStyle,
        ...style,
      }}
      {...props}
      onPress={onPress}>
      {text}
      {children}
    </Text>
  );
};

export default TextComp;

const styles = StyleSheet.create({
  textStyle: {
    color: '#000',
    fontSize: textScale(12),
  },
});
