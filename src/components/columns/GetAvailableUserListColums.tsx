import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {spacing} from '../../styles/spacing';
import TextComp from '../common/TextComp';
import {scale, textScale} from '../../styles/responsiveStyles';
import LoadingScreen from '../../components/common/Loader';

interface GetAvailableUserListColumsProps {
  item: Record<string, any>;
  index?: any;
  onPressProgram: (item: Record<string, any>) => void;
  isLoading?: boolean;
  refetchData?: () => void;
  isError?: boolean;
}

const GetAvailableUserListColums = ({
  item,
  isLoading,
  isError,
  onPressProgram,
}: // navigation
GetAvailableUserListColumsProps) => {

  return (
    <>
      {isLoading ? (
        <LoadingScreen color="red" />
      ) : (
        <TouchableOpacity
          style={styles.container}
          activeOpacity={0.7}
          onPress={() => onPressProgram(item)}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flex: 1,
              paddingVertical: spacing.PADDING_8,
            }}>
            <Image source={{uri: item.avatar.url}} style={styles.imageStyle} />
            <View style={{marginLeft: spacing.MARGIN_8}}>
              <TextComp text={item.username} style={styles.nameText} />
            </View>
          </View>
          <Text>{}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default GetAvailableUserListColums;

const styles = StyleSheet.create({
  container: {
    marginTop: spacing.MARGIN_16,
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
  },
  imageStyle: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'contain',
    borderRadius: scale(50)/2,
    backgroundColor:"#000"
  },
});
