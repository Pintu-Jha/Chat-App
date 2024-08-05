import {Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {moderateScale, scale, textScale} from '../../styles/responsiveStyles';
import TextComp from '../common/TextComp';

interface NewGroupDatarowsProps {
  item: any;
  index?: number;
}

const NewGroupRow: FC<NewGroupDatarowsProps> = ({item, index}) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: moderateScale(18),
        marginVertical: moderateScale(10),
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image source={{uri: item.avatar.url}} style={styles.imageStyle} />
      <TextComp text={item.username} style={styles.userNameStyle} />
    </View>
  );
};

export default NewGroupRow;

const styles = StyleSheet.create({
  imageStyle: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'cover',
    borderRadius: scale(50) / 2,
  },
  userNameStyle: {
    fontSize: textScale(14),
    color: '#000',
    marginTop: moderateScale(4),
    textTransform: 'capitalize',
    fontWeight: '500',
  },
});
