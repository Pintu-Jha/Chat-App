import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {spacing} from '../../styles/spacing';
import {textScale} from '../../styles/responsiveStyles';
import {fontNames} from '../../styles/typography';
import TextComp from './TextComp';
import ImagePath from '../../Utills/ImagePath';

const PopularTextHeading = ({
  text = '',
  leftIcon = true,
  style = {},
  onfilterPress,
}) => {
  return (
    <View style={{...styles.popularTextHeadingContainer, ...style}}>
      <TextComp text={text} style={styles.popularHeadingTextStyle} />
      {leftIcon ? (
        <TouchableOpacity onPress={onfilterPress}>
          <Image source={ImagePath.IC_SETTING} style={styles.filterIconStyle} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default PopularTextHeading;

const styles = StyleSheet.create({
  popularTextHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginVertical: spacing.MARGIN_16,
  },
  popularHeadingTextStyle: {
    color: '#463196',
    fontSize: textScale(16),
    fontFamily: fontNames.POPPINS_FONT_FAMILY_MEDIUM,
    marginLeft: spacing.MARGIN_30,
  },
  filterIconStyle: {
    width: spacing.WIDTH_20,
    height: spacing.HEIGHT_16,
    tintColor: '#463196',
    resizeMode: 'contain',
  },
});
