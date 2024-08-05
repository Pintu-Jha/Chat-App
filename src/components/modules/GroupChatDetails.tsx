import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {RouteProp} from '@react-navigation/native';
import {MainRootStackParams} from '../../navigation/MainStack';
import navigationString from '../../navigation/navigationString';
import Header from '../common/Header';
import LeftArrowSvg from '../../asset/SVG/LeftArrowSvg';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from '../../styles/responsiveStyles';
import {localIPAddress} from '../../config/url';
import TextComp from '../common/TextComp';
import GroupChatDetailsColum from '../columns/GroupChatDetailsColum';

type GroupChatDetailsScreenRouteProp = RouteProp<
  MainRootStackParams,
  typeof navigationString.GroupChatDetailsScreen
>;
type GroupChatDetailsScreenNavigationProp = NativeStackNavigationProp<
  MainRootStackParams,
  typeof navigationString.GroupChatDetailsScreen
>;
type GroupCHatDetailsScreenProps = {
  route: GroupChatDetailsScreenRouteProp;
  navigation: GroupChatDetailsScreenNavigationProp;
};

interface GroupChatDetailsColumsProps {
  item: Record<string, any>;
  index?: any;
}

const GroupChatDetails: FC<GroupCHatDetailsScreenProps> = ({
  route,
  navigation,
}) => {
  const {GroupChatDetails} = route.params;
  return (
    <View>
      <Header
        isRightHeaderContainer={true}
        isRightHeaderContainerImageWant={false}
        thirdIcon={<LeftArrowSvg />}
        leftArrowNavigation={() => navigation.goBack()}
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: verticalScale(16),
        }}>
        <View style={styles.groupAvatarContainer}>
          {GroupChatDetails?.participants?.slice(0, 3).map(
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
                  uri: participant?.avatar?.url.replace(
                    'localhost',
                    localIPAddress,
                  ),
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
        <TextComp text={GroupChatDetails?.name} style={styles.groupName} />
        <TextComp
          text={`Group Member: ${GroupChatDetails?.participants?.length}`}
          style={styles.groupuserLength}
        />
      </View>
      <View>
        {/* <View
          style={{
            height: verticalScale(0.5),
            backgroundColor: '#000',
            marginHorizontal: moderateScale(16),
          }}
        /> */}

        <View
          style={{
            paddingHorizontal: moderateScale(16),
            marginTop: moderateScale(20),
          }}>
          <TextComp
            text={`Member: ${GroupChatDetails?.participants?.length}`}
            style={styles.groupuserLength}
          />
          <FlatList
            data={GroupChatDetails}
            keyExtractor={item => item?._id?.toString()}
            renderItem={({item, index}) => {
              return (
                <GroupChatDetailsColum
                  item={item}
                  index={index}
                  key={GroupChatDetailsColum + item?._id}
                />
              );
            }}
          />
        </View>
      </View>
    </View>
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
});
