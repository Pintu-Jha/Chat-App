import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {spacing} from '../../styles/spacing';
import AddSvg from '../../asset/SVG/AddSvg';

interface CommonFlotingBottonProps {
  onPress?: () => void;
  activeOpacity?: number;
}

const CommonFlotingBotton: FC<CommonFlotingBottonProps> = ({
  onPress,
  activeOpacity = 0.8,
}) => {
  return (
    <TouchableOpacity
      style={styles.bottonContainer}
      activeOpacity={activeOpacity}
      onPress={onPress}>
      <AddSvg />
    </TouchableOpacity>
  );
};

export default CommonFlotingBotton;

const styles = StyleSheet.create({
  bottonContainer: {
    width: spacing.WIDTH_54,
    height: spacing.HEIGHT_54,
    borderRadius: spacing.RADIUS_16,
    backgroundColor: 'green',
    position: 'absolute',
    bottom: spacing.HEIGHT_30,
    right: spacing.WIDTH_20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
