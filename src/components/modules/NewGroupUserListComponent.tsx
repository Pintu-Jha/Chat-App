import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {MainRootStackParams} from '../../navigation/MainStack';
import GetAvailableUserListColums from '../columns/GetAvailableUserListColums';
import navigationString from '../../navigation/navigationString';
import Header from '../common/Header';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import VirtualizedView from '../common/VirtualizedView';
import NewGroupRow from '../rows/NewGroupRow';
import {UserInterface} from '../interfaces/user';
import {moderateScale, verticalScale} from '../../styles/responsiveStyles';
import CommonFlotingBotton from '../common/CommonFlotingBotton';
import RightArrow from '../../asset/SVG/RightArrow';
import {showError} from '../../utills/HelperFuncation';

type AvailableScreenRouteProp = RouteProp<
  MainRootStackParams,
  typeof navigationString.NewGroup_Screen
>;
type Props = NativeStackScreenProps<
  MainRootStackParams,
  typeof navigationString.NewGroup_Screen
>;
type NewGroupScreenProps = {
  route: AvailableScreenRouteProp;
};

const NewGroupUserListComponent: FC<NewGroupScreenProps> = ({route}) => {
  const navigation = useNavigation<Props['navigation']>();
  const [selectedNewGroupUser, setSelectedNewGroupUser] = useState<
    UserInterface[]
  >([]);
  const {AvailableUserData} = route.params;

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
  const handlePress = () => {
    if (selectedNewGroupUser.length > 0) {
      navigation.navigate(navigationString.NewGroupColum_Screen, {
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
          leftArrowNavigation={() => navigation.goBack()}
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
          data={AvailableUserData}
          keyExtractor={item => item._id.toString()}
          renderItem={({item, index}) => {
            const isSelected = selectedNewGroupUser.find(
              user => user?._id === item?._id,
            );
            return (
              <GetAvailableUserListColums
                item={item}
                index={index}
                key={'GetAvailableUserListColums' + item._id}
                onPressProgram={onPressProgram}
                isSelected={!!isSelected}
              />
            );
          }}
        />
      </VirtualizedView>
      <CommonFlotingBotton Icon={<RightArrow />} onPress={handlePress} />
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
