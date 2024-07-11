import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {spacing} from '../../styles/spacing';
import TextComp from './TextComp';
import {textScale} from '../../styles/responsiveStyles';
import MenuSvg from '../../asset/SVG/MenuSvg';

interface HeaderContainerProps {
  text?: string;
  style?: any;
  onPress?: () => void;
}

const Header: FC<HeaderContainerProps> = ({text = '', style,onPress }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <TextComp text={text} style={{...styles.headerTextStyle, ...style}} />
      </View>
      <TouchableOpacity onPress={onPress}>
        <MenuSvg />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    height: spacing.HEIGHT_50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: spacing.PADDING_10,
  },
  headerTextStyle: {
    fontSize: textScale(25),
    fontWeight: '800',
    opacity: 0.7,
  },
});
