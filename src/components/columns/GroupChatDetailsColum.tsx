import React from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import DeleteSvg from '../../asset/SVG/DeleteSvg';
import { moderateScale, scale, textScale } from '../../styles/responsiveStyles';
import TextComp from '../common/TextComp';

interface GroupChatDetailsColumsProps {
  item: Record<string, any>;
  index?: any;
  onPressRemoveParticipent: (item: string) => void;
}

const GroupChatDetailsColum = ({
  item,
  onPressRemoveParticipent,
}: GroupChatDetailsColumsProps) => {
  return (
    <View
      style={{
        marginVertical: moderateScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={{
            uri: item.avatar.url,
          }}
          style={styles.imageStyle}
        />
        <TextComp text={item?.username} style={styles.nameText} />
        {item?.role === 'ADMIN' && (
          <View style={styles.roleTextContainer}>
            <TextComp text={item?.role} style={styles.roleText} />
          </View>
        )}
      </View>
      <TouchableOpacity onPress={() => onPressRemoveParticipent(item?._id)}>
        <DeleteSvg stroke={'red'} />
      </TouchableOpacity>
    </View>
  );
};

export default GroupChatDetailsColum;

const styles = StyleSheet.create({
  nameText: {
    color: '#0F0C1A',
    opacity: 1,
    fontSize: textScale(24),
    fontWeight: '600',
    textTransform: 'capitalize',
    marginLeft: moderateScale(12),
  },
  imageStyle: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'cover',
    borderRadius: scale(60) / 2,
  },
  roleText: {
    fontSize: textScale(14),
    color: '#fff',
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  roleTextContainer: {
    backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: moderateScale(10),
    padding: moderateScale(4),
    borderRadius: moderateScale(50),
  },
});
