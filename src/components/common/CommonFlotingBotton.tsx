import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {spacing} from '../../styles/spacing';
import AddSvg from '../../asset/SVG/AddSvg';
import {
  moderateScale,
  scale,
  verticalScale,
} from '../../styles/responsiveStyles';

interface CommonFlotingBottonProps {
  onPress?: () => void;
  activeOpacity?: number;
  Icon?: any;
}

const CommonFlotingBotton: FC<CommonFlotingBottonProps> = ({
  onPress,
  activeOpacity = 0.8,
  Icon,
}) => {
  return (
    <TouchableOpacity
      style={styles.bottonContainer}
      activeOpacity={activeOpacity}
      onPress={onPress}>
      {Icon}
    </TouchableOpacity>
  );
};

export default CommonFlotingBotton;

const styles = StyleSheet.create({
  bottonContainer: {
    width: scale(54),
    height: scale(54),
    borderRadius: moderateScale(16),
    backgroundColor: 'green',
    position: 'absolute',
    bottom: verticalScale(30),
    right: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
