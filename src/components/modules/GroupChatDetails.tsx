import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useGetGroupChatDetailsQuery,
  useLeaveGroupCHatMutation,
  useRemoveGroupChatParticipentMutation,
} from '../../API/endpoints/mainApi';
import CommunitiesSvg from '../../asset/SVG/CommunitiesSvg';
import ExitSvg from '../../asset/SVG/ExitSvg';
import LeftArrowSvg from '../../asset/SVG/LeftArrowSvg';
import navigationString from '../../navigation/navigationString';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
  width,
} from '../../styles/responsiveStyles';
import {goBack, navigate} from '../../utills/HelperFuncation';
import GroupChatDetailsColum from '../columns/GroupChatDetailsColum';
import Header from '../common/Header';
import LoadingScreen from '../common/Loader';
import TextComp from '../common/TextComp';
import VirtualizedView from '../common/VirtualizedView';

const GroupChatDetails = ({route}: any) => {
  const {params} = route;
  const [removePaaricipent, {isLoading}] =
    useRemoveGroupChatParticipentMutation();
  const [leaveChat] = useLeaveGroupCHatMutation();
  const {data: GroupChatDetails, refetch: refechGroupChatDetails} =
    useGetGroupChatDetailsQuery({
      roomId: params?.roomId,
    });
  const onPressRemoveParticipent = async (item: string) => {
    try {
      await removePaaricipent({
        roomId: GroupChatDetails?.data?._id,
        participentId: item,
      });
      refechGroupChatDetails();
    } catch (error) {
      console.log('remove participent faild:', error);
    }
  };
  const onPressLeaveChat = async () => {
    try {
      await leaveChat({roomId: GroupChatDetails?.data?._id});
      navigate(navigationString.MESSAGE_SCREEN);
    } catch (error) {
      console.log('leave chat faild:', error);
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
                  uri: participant?.avatar?.url,
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
              AvailableUserData: GroupChatDetails?.data,
              roomId:params?.roomId
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
        {isLoading ? (
          <LoadingScreen color="#000" />
        ) : (
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
        )}
      </View>
      <TouchableOpacity
        style={styles.exitGroupContainer}
        onPress={onPressLeaveChat}>
        <ExitSvg />
        <TextComp text="Exit Group" style={styles.exitGroupText} />
      </TouchableOpacity>
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
    zIndex: 0,
  },
  avatarPosition1: {
    left: 0,
    zIndex: 2,
  },
  avatarPosition2: {
    left: 10,
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
  exitGroupContainer: {
    marginVertical: moderateScale(20),
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: moderateScale(30),
    width: scale(width / 2.5),
  },
  exitGroupText: {
    fontSize: textScale(20),
    color: 'red',
    marginLeft: moderateScale(12),
  },
});
