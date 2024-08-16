import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import {
  useCreateChatMutation,
  useGetAvailableUserQuery,
} from '../../API/endpoints/mainApi';
import CommunitiesSvg from '../../asset/SVG/CommunitiesSvg';
import navigationString from '../../navigation/navigationString';
import { createChatData } from '../../redux/slices/createChatSlice';
import { moderateScale, scale, textScale } from '../../styles/responsiveStyles';
import { goBack, navigate } from '../../utills/HelperFuncation';
import GetAvailableUserListColums from '../columns/GetAvailableUserListColums';
import Header from '../common/Header';
import TextComp from '../common/TextComp';
import { UserInterface } from '../interfaces/user';


const GetAvailableUserListcomponent = ({}) => {
  const dispatch = useDispatch();
  const {
    data: usersAvailable,
    isLoading,
    isError,
    refetch: refetchData,
  } = useGetAvailableUserQuery();
  const [createChat] = useCreateChatMutation();

  async function onPressProgram(item: UserInterface) {
    try {
      const {data, statusCode, message, success} = await createChat({
        receiverId: item._id,
      }).unwrap();
      dispatch(
        createChatData({
          statusCode: statusCode,
          data: data,
          message: message,
          success: success,
        }),
      );
      navigate(navigationString.CHAT_SCREEN, {userId: data});
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View>
      <Header
        isRightHeaderContainer={true}
        isRightHeaderContainerImageWant={false}
        leftArrowNavigation={() => goBack()}
      />
      <TouchableOpacity
        style={styles.newGroupBtnContainer}
        onPress={() =>
          navigate(navigationString.NewGroup_Screen)
        }>
        <View style={styles.newGroupBtn}>
          <CommunitiesSvg />
        </View>
        <TextComp text="New Group" style={styles.newGroupBtnTextStyle} />
      </TouchableOpacity>
      <FlatList
        data={usersAvailable?.data}
        keyExtractor={(item, index) => item._id.toString()}
        renderItem={({item, index}) => (
          <GetAvailableUserListColums
            item={item}
            index={index}
            isLoading={isLoading}
            key={'GetAvailableUserListColums' + item._id}
            refetchData={refetchData}
            isError={isError}
            onPressProgram={onPressProgram}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginVertical: moderateScale(16),
    marginHorizontal: moderateScale(20),
  },
  newGroupBtnTextStyle: {
    color: '#0F0C1A',
    opacity: 1,
    fontSize: textScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(12),
  },
});

export default GetAvailableUserListcomponent;
