import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {spacing} from '../../styles/spacing';
import TextComp from './TextComp';
import {
  moderateScale,
  scale,
  textScale,
  width,
} from '../../styles/responsiveStyles';
import MenuSvg from '../../asset/SVG/MenuSvg';
import CallSvg from '../../asset/SVG/CallSvg';
import VideoSvg from '../../asset/SVG/VideoSvg';
import LeftArrowSvg from '../../asset/SVG/LeftArrowSvg';
import {fontNames} from '../../styles/typography';

interface HeaderContainerProps {
  text?: string;
  style?: any;
  onPress?: () => void;
  isFirstIcon?: boolean;
  firstIcon?: any;
  isSecondIcon?: boolean;
  secondIcon?: any;
  isThirdIcon?: boolean;
  thirdIcon?: any;
  isForthIcon?: boolean;
  forthIcon?: any;
  isRightHeaderContainer: boolean;
  userDp?: string;
  userNameText?: string;
  leftArrowNavigation?: () => void;
}

const Header: FC<HeaderContainerProps> = ({
  text = '',
  style,
  onPress,
  isFirstIcon = false,
  firstIcon,
  isSecondIcon = false,
  secondIcon = <VideoSvg />,
  isThirdIcon = false,
  thirdIcon = <CallSvg />,
  isForthIcon = false,
  forthIcon = <MenuSvg />,
  isRightHeaderContainer = false,
  userDp = 'https://t4.ftcdn.net/jpg/05/89/93/27/360_F_589932782_vQAEAZhHnq1QCGu5ikwrYaQD0Mmurm0N.jpg',
  userNameText,
  leftArrowNavigation,
}) => {
  return (
    <View style={styles.headerContainer}>
      {isRightHeaderContainer ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            maxWidth: scale(width),
          }}>
          <TouchableOpacity onPress={leftArrowNavigation}>
            <LeftArrowSvg />
          </TouchableOpacity>
          <Image
            source={{uri: userDp}}
            style={{
              width: scale(40),
              height: scale(40),
              borderRadius: scale(40) / 2,
              marginHorizontal: moderateScale(7),
            }}
          />
          <TextComp text={userNameText} style={styles.userNameTextStyle} />
        </View>
      ) : (
        <TextComp text={text} style={{...styles.headerTextStyle, ...style}} />
      )}

      <View style={styles.headerIconsContainer}>
        {isFirstIcon ? (
          <TouchableOpacity>
            <Text>{firstIcon}</Text>
          </TouchableOpacity>
        ) : null}
        {isSecondIcon ? (
          <TouchableOpacity style={{marginHorizontal: moderateScale(8)}}>
            <Text>{secondIcon}</Text>
          </TouchableOpacity>
        ) : null}
        {isThirdIcon ? (
          <TouchableOpacity style={{marginHorizontal: moderateScale(8)}}>
            <Text>{thirdIcon}</Text>
          </TouchableOpacity>
        ) : null}
        {isForthIcon ? (
          <TouchableOpacity onPress={onPress}>
            <Text>{forthIcon}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    // height: spacing.HEIGHT_50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: spacing.PADDING_10,
    paddingVertical: moderateScale(6),
  },
  headerTextStyle: {
    fontSize: textScale(25),
    fontWeight: '800',
    opacity: 0.7,
  },
  headerIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  userNameTextStyle: {
    fontSize: textScale(20),
    fontFamily: fontNames.POPPINS_FONT_FAMILY_BOLD,
    textTransform: 'capitalize',
    color: '#000',
  },
});
