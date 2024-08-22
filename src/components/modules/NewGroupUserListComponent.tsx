import React, { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import {
  useAddGroupChatParticipentMutation,
  useGetAvailableUserQuery,
  useGetGroupChatDetailsQuery
} from '../../API/endpoints/mainApi';
import RightArrow from '../../asset/SVG/RightArrow';
import navigationString from '../../navigation/navigationString';
import { moderateScale, verticalScale } from '../../styles/responsiveStyles';
import { goBack, navigate, showError } from '../../utills/HelperFuncation';
import GetAvailableUserListColums from '../columns/GetAvailableUserListColums';
import CommonFlotingBotton from '../common/CommonFlotingBotton';
import Header from '../common/Header';
import VirtualizedView from '../common/VirtualizedView';
import { UserInterface } from '../interfaces/user';
import NewGroupRow from '../rows/NewGroupRow';

const NewGroupUserListComponent = ({route}: any) => {
  const {params} = route;

  const [selectedNewGroupUser, setSelectedNewGroupUser] = useState<
    UserInterface[]
  >([]);
  const {data: usersAvailable} = useGetAvailableUserQuery();
  const [addGroupChatParticipent] = useAddGroupChatParticipentMutation();
  const {refetch: refetchGroupChatDetails} = useGetGroupChatDetailsQuery({
    roomId: params?.roomId,
  });
  const notInSecondArray = usersAvailable?.data.filter(
    (item1: {_id: any}) =>
      !params?.AvailableUserData?.participants.some(
        (item2: {_id: any}) => item1._id === item2._id,
      ),
  );
  const ids = notInSecondArray.map((item: {_id: any}) => item._id);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onPressProgram = (item: UserInterface) => {
    setSelectedNewGroupUser(prevSelectedUsers => {
      const isItemAlreadySelected = prevSelectedUsers.some(
        user => user._id === item._id,
      );
      if (isItemAlreadySelected) {
        return prevSelectedUsers.filter(user => user._id !== item._id);
      }
      return [...prevSelectedUsers, item];
    });
  };
  const handlePress = async () => {
    if (params?.AvailableUserData?._id) {
      setIsLoading(true);
      await addGroupChatParticipent({
        roomId: params?.AvailableUserData?._id,
        participentId: selectedNewGroupUser[0]?._id,
      });
      refetchGroupChatDetails();
      setIsLoading(false);
      goBack();
    } else if (selectedNewGroupUser.length > 0) {
      navigate(navigationString.NewGroupColum_Screen, {
        SelectedUser: selectedNewGroupUser,
      });
    } else {
      showError('Atleast one selecte');
    }
  };

  return (
    <>
      <VirtualizedView>
        <Header
          isRightHeaderContainer={true}
          isRightHeaderContainerImageWant={false}
          userNameText="New Group"
          leftArrowNavigation={() => goBack()}
        />
        {selectedNewGroupUser.length > 0 ? (
          <>
            <FlatList
              data={selectedNewGroupUser}
              keyExtractor={item => item?._id?.toString()}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              renderItem={({item, index}) => (
                <NewGroupRow
                  item={item}
                  index={index}
                  key={'NewGroupDataRow' + item?._id}
                />
              )}
            />
            <View style={styles.selectedNewGroupUserhorizontaLine} />
          </>
        ) : null}
        <FlatList
          data={usersAvailable?.data}
          keyExtractor={item => item._id.toString()}
          renderItem={({item, index}) => {
            const isSelected = selectedNewGroupUser.find(
              user => user?._id === item?._id,
            );
            const isDisabled = !ids.includes(item._id) ? true : false;
            return (
              <GetAvailableUserListColums
                item={item}
                index={index}
                key={'GetAvailableUserListColums' + item._id}
                onPressProgram={onPressProgram}
                isSelected={!!isSelected}
                isDisabled={isDisabled}
              />
            );
          }}
        />
      </VirtualizedView>
      <CommonFlotingBotton
        Icon={<RightArrow />}
        onPress={handlePress}
        isLoading={isLoading}
      />
    </>
  );
};

export default NewGroupUserListComponent;

const styles = StyleSheet.create({
  selectedNewGroupUserhorizontaLine: {
    height: verticalScale(1),
    backgroundColor: '#000',
    marginHorizontal: moderateScale(10),
  },
});
