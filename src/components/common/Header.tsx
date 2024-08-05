import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {spacing} from '../../styles/spacing';
import TextComp from './TextComp';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
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
  onPressMeanu?: () => void;
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
  onPressThirdIcon?: () => void;
  isRightHeaderContainerImageWant?: boolean;
  typing?: boolean;
  getChatDetails?:()=> void
}

const Header: FC<HeaderContainerProps> = ({
  text = '',
  style,
  onPressMeanu,
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
  onPressThirdIcon,
  isRightHeaderContainerImageWant = true,
  typing = false,
  getChatDetails
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
          {isRightHeaderContainerImageWant ? (
            <Image
              source={{uri: userDp}}
              style={{
                width: scale(40),
                height: scale(40),
                borderRadius: scale(40) / 2,
                marginLeft: moderateScale(7),
              }}
            />
          ) : null}
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginLeft: moderateScale(7),
            }}>
           <TouchableOpacity onPress={getChatDetails} activeOpacity={1}>
           <TextComp text={userNameText} style={styles.userNameTextStyle} />
           </TouchableOpacity>
            {typing ? (
              <TextComp text="typing..." style={styles.typingStyle} />
            ) : null}
          </View>
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
          <TouchableOpacity
            style={{marginHorizontal: moderateScale(8)}}
            onPress={onPressThirdIcon}>
            <Text>{thirdIcon}</Text>
          </TouchableOpacity>
        ) : null}
        {isForthIcon ? (
          <TouchableOpacity onPress={onPressMeanu}>
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
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.PADDING_10,
    paddingVertical: moderateScale(14),
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
  typingStyle: {
    color: '#25D366',
    fontSize: textScale(14),
    fontWeight: 'bold',
  },
});
