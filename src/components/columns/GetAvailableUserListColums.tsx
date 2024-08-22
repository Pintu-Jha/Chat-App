import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckMark from '../../asset/SVG/CheckMarkSvg';
import LoadingScreen from '../../components/common/Loader';
import { moderateScale, scale, textScale } from '../../styles/responsiveStyles';
import { spacing } from '../../styles/spacing';
import TextComp from '../common/TextComp';
import { UserInterface } from '../interfaces/user';

type GetAvailableUserListColumsProps = {
  item: UserInterface;
  index?: any;
  onPressProgram: (item: UserInterface) => void;
  isLoading?: boolean;
  refetchData?: () => void;
  isError?: boolean;
  isSelected?: boolean;
  isDisabled?: boolean;
};

const GetAvailableUserListColums = ({
  item,
  isLoading,
  onPressProgram,
  isSelected,
  isDisabled,
}: GetAvailableUserListColumsProps) => {
  return (
    <>
      {isLoading ? (
        <LoadingScreen color="#000" />
      ) : (
        <TouchableOpacity
          style={[styles.container, isDisabled && styles.disabledContainer]}
          activeOpacity={0.7}
          onPress={() => onPressProgram(item)}
          disabled={isDisabled}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
            }}>
            <Image source={{uri: item.avatar.url}} style={styles.imageStyle} />
            <View style={{}}>
              <TextComp text={item.username} style={styles.nameText} />
            </View>
          </View>
          {isSelected && (
            <Text style={{position: 'absolute', bottom: 0, left: scale(35)}}>
              <CheckMark />
            </Text>
          )}
        </TouchableOpacity>
      )}
    </>
  );
};

export default GetAvailableUserListColums;

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.MARGIN_16,
    marginHorizontal: spacing.MARGIN_20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    color: '#0F0C1A',
    opacity: 1,
    fontSize: textScale(16),
    fontWeight: '600',
    textTransform: 'capitalize',
    marginLeft: moderateScale(12),
  },
  imageStyle: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'cover',
    borderRadius: scale(50) / 2,
  },
  disabledContainer: {
    opacity: 0.5,
  },
});
