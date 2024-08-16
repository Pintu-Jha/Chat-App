import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {spacing} from '../../styles/spacing';
import TextComp from './TextComp';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import ImagePath from '../../Utills/ImagePath';

const AnimatedComponentToggale = ({
  initialHeight,
  children,
  tabName = '',
  bottomLine = true,
  source,
  AnimationBtnContainer,
  tabNameStyle,
}) => {
  const boxHeight = useSharedValue(0);

  const toggleHeight = () => {
    boxHeight.value =
      boxHeight.value === 0
        ? (boxHeight.value = initialHeight)
        : (boxHeight.value = 0);
  };

  const truncatedAnimation = useAnimatedStyle(() => {
    return {
      height: withTiming(boxHeight.value, {duration: 500}),
    };
  }, []);
  return (
    <View style={{flex: 1,}}>
      <TouchableOpacity onPress={toggleHeight} style={{...styles.btnContainer,...AnimationBtnContainer}}>
        <TextComp text={tabName} style={{...styles.tabNameStyle,...tabNameStyle}} />
        <Image source={source ? source : ImagePath.IC_DOWN_ARROW} />
      </TouchableOpacity>
      <Animated.View
        style={[{flex: 1, overflow: 'hidden'}, truncatedAnimation]}>
        {children}
      </Animated.View>
    </View>
  );
};

export default AnimatedComponentToggale;

const styles = StyleSheet.create({
  btnContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: spacing.FULL_WIDTH / 1.2,
    height: spacing.HEIGHT_40,
    marginVertical: spacing.MARGIN_4,
    paddingHorizontal: spacing.PADDING_16,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  bottomLine: {
    height: 2,
    backgroundColor: '#463196',
    width: spacing.FULL_WIDTH / 1.2,
    alignSelf: 'center',
    opacity: 0.76,
  },
  tabNameStyle: {
    color: '#463196',
    fontSize: textScale(12),
    fontFamily: fontNames.POPPINS_FONT_FAMILY_MEDIUM,
    opacity: 1,
    marginLeft: spacing.MARGIN_10,
  },
});
