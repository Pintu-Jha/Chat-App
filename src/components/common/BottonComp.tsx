import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import { fontNames } from '../../styles/typography';

type TextInputContainerProps = {
  onPress?: () => void;
  text?: string;
  style?: ViewStyle;
  isleftImg?: boolean;
  IconStyle?: {};
  source?: {};
  rightImg?: boolean;
  textStyle?: TextStyle;
  isLoading?: boolean;
  leftSvg?: any;
  ActivityIndicatorColor?:string
};

const BottonComp= ({
  onPress,
  text = '',
  style = {},
  isleftImg = false,
  IconStyle,
  source = {},
  rightImg = false,
  textStyle = {},
  isLoading = false,
  leftSvg = null,
  ActivityIndicatorColor='white'
} : TextInputContainerProps) => {
  return (
    <TouchableOpacity
      style={{...styles.container, ...style}}
      onPress={onPress}
      activeOpacity={0.8}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={ActivityIndicatorColor} />
      ) : (
        <View style={styles.content}>
          {isleftImg && <View>{leftSvg}</View>}
          <Text style={{...styles.textStyle, ...textStyle}}>{text}</Text>
        </View>
      )}
      {!!rightImg ? (
        <Image source={source} style={{...styles.IconStyle, ...IconStyle}} />
      ) : null}
    </TouchableOpacity>
  );
};

export default BottonComp;

const styles = StyleSheet.create({
  container: {
    borderRadius: spacing.RADIUS_12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fffefe',
    borderWidth: 1,
    borderColor: '#C8C1DF',
    height: spacing.HEIGHT_50,
    flexDirection: 'row',
    marginBottom: spacing.MARGIN_8,
  },
  textStyle: {
    color: '#0F0C1A',
    fontSize: textScale(14),
    fontFamily: fontNames.POPPINS_FONT_FAMILY_MEDIUM,
  },
  IconStyle: {
    resizeMode: 'contain',
    width: spacing.WIDTH_18,
    height: spacing.HEIGHT_18,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
