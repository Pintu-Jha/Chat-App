import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useRemoveGroupChatParticipentMutation } from '../../API/endpoints/mainApi';
import CommunitiesSvg from '../../asset/SVG/CommunitiesSvg';
import LeftArrowSvg from '../../asset/SVG/LeftArrowSvg';
import navigationString from '../../navigation/navigationString';
import { groupChatDetails } from '../../redux/slices/groupChatDetailsSlice';
import { RootState } from '../../redux/store';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from '../../styles/responsiveStyles';
import { goBack, navigate } from '../../utills/HelperFuncation';
import GroupChatDetailsColum from '../columns/GroupChatDetailsColum';
import Header from '../common/Header';
import TextComp from '../common/TextComp';
import VirtualizedView from '../common/VirtualizedView';

const GroupChatDetails = ({}) => {
  4;
  const dispatch = useDispatch();
  const GroupChatDetails = useSelector(
    (state: RootState) => state?.GroupChatDetails,
  );
  const [removePaaricipent] = useRemoveGroupChatParticipentMutation();
  const onPressRemoveParticipent = async (item: string) => {
    try {
      const res = await removePaaricipent({
        roomId: GroupChatDetails?.data?._id,
        participentId: item,
      });
      dispatch(
        groupChatDetails({
          data: res.data?.data,
          message: res.data?.message || '',
        }),
      );
    } catch (error) {
      console.log('remove participent faild:', error);
    }
  };
  return (
    <VirtualizedView>
      <Header
        isRightHeaderContainer={true}
        isRightHeaderContainerImageWant={false}
        userNameText={GroupChatDetails?.data?.name}
        thirdIcon={<LeftArrowSvg />}
        leftArrowNavigation={() => goBack()}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: verticalScale(16),
        }}>
        <View style={styles.groupAvatarContainer}>
          {GroupChatDetails?.data?.participants?.slice(0, 3).map(
            (
              participant: {
                avatar: any;
                _id: React.Key | null | undefined;
              },
              i: number,
            ) => (
              <Image
                key={participant._id}
                source={{
                  uri: participant?.avatar?.url
                }}
                style={[
                  styles.avatar,
                  i === 0
                    ? styles.avatarPosition0
                    : i === 1
                    ? styles.avatarPosition1
                    : i === 2
                    ? styles.avatarPosition2
                    : null,
                ]}
              />
            ),
          )}
        </View>
        <TextComp
          text={GroupChatDetails?.data?.name}
          style={styles.groupName}
        />
        <TextComp
          text={`Group Member: ${GroupChatDetails?.data?.participants.length}`}
          style={styles.groupuserLength}
        />
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(16),
          marginTop: moderateScale(20),
        }}>
        <TextComp
          text={`Member: ${GroupChatDetails?.data?.participants.length}`}
          style={styles.groupuserLength}
        />
        <TouchableOpacity
          style={styles.newGroupBtnContainer}
          onPress={() =>
            navigate(navigationString.NewGroup_Screen, {
              AvailableUserData: GroupChatDetails?.data?._id,
            })
          }>
          <View style={styles.newGroupBtn}>
            <CommunitiesSvg />
          </View>
          <TextComp
            text="Add Participent"
            style={styles.newGroupBtnTextStyle}
          />
        </TouchableOpacity>
        <FlatList
          data={GroupChatDetails?.data?.participants}
          keyExtractor={item => item?._id.toString()}
          renderItem={({item, index}) => {
            return (
              <GroupChatDetailsColum
                item={item}
                index={index}
                key={GroupChatDetailsColum + item?._id}
                onPressRemoveParticipent={onPressRemoveParticipent}
              />
            );
          }}
        />
      </View>
    </VirtualizedView>
  );
};

export default GroupChatDetails;

const styles = StyleSheet.create({
  groupAvatarContainer: {
    width: scale(70),
    height: scale(60),
    position: 'relative',
  },
  avatarPosition0: {
    left: 0,
    zIndex: 3,
  },
  avatarPosition1: {
    left: 20,
    zIndex: 2,
  },
  avatarPosition2: {
    left: 40,
    zIndex: 1,
  },
  avatar: {
    width: scale(55),
    height: scale(55),
    resizeMode: 'cover',
    borderRadius: scale(55) / 2,
    borderColor: 'white',
    position: 'absolute',
  },
  groupName: {fontSize: textScale(24), color: '#000', fontWeight: '700'},
  groupuserLength: {fontSize: textScale(16), color: '#000', fontWeight: '500'},
  newGroupBtn: {
    width: scale(50),
    height: scale(50),
    backgroundColor: 'green',
    borderRadius: scale(50) / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  newGroupBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  newGroupBtnTextStyle: {
    color: '#0F0C1A',
    opacity: 1,
    fontSize: textScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(12),
  },
});
