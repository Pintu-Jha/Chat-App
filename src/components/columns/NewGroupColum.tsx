import React, {useState} from 'react';
import {FlatList, Image, StyleSheet, TextInput, View} from 'react-native';
import {useCreateGroupChatMutation} from '../../API/endpoints/mainApi';
import YesSvg from '../../asset/SVG/YesSvg';
import navigationString from '../../navigation/navigationString';
import {moderateScale, scale} from '../../styles/responsiveStyles';
import {goBack, navigate} from '../../utills/HelperFuncation';
import CommonFlotingBotton from '../common/CommonFlotingBotton';
import Header from '../common/Header';

// type paramsType = {
//   userId: ChatListItemInterface;
// };
const NewGroupColum = ({route}: any) => {
  const [name, setGroupName] = useState<string>('');

  const {SelectedUser} = route.params;
  const [CreateGroupChat] = useCreateGroupChatMutation();
  const handalePress = async () => {
    try {
      if (name.trim() === '') return;
      const participantArray = SelectedUser.map(
        (user: {_id: string}) => user._id,
      );
      const CreateGroupData = {name, participants: participantArray};
      await CreateGroupChat({
        CreateGroupData: CreateGroupData,
      }).unwrap();
      navigate(navigationString.MESSAGE_SCREEN);
    } catch (error) {
      console.error('Failed to Create group chat:', error);
    }
  };
  const renderItem = ({item}: any) => {
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
      </View>
    );
  };

  return (
    <>
      <Header
        isRightHeaderContainer={true}
        isRightHeaderContainerImageWant={false}
        userNameText="New Group"
        leftArrowNavigation={() => goBack()}
      />

      <View style={styles.container}>
        <TextInput
          value={name}
          onChangeText={e => setGroupName(e)}
          style={styles.TextInputStyle}
          placeholder="Enter Group Name"
        />
        <FlatList
          data={SelectedUser}
          renderItem={renderItem}
          keyExtractor={item => item?._id.toString()}
          horizontal
        />
      </View>
      <CommonFlotingBotton Icon={<YesSvg />} onPress={handalePress} />
    </>
  );
};

export default NewGroupColum;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(18),
    paddingVertical: moderateScale(16),
  },
  TextInputStyle: {
    borderBottomWidth: 1,
  },
  imageStyle: {
    width: scale(50),
    height: scale(50),
    resizeMode: 'cover',
    borderRadius: scale(50) / 2,
  },
});
