import React from 'react';
import {StyleSheet, View} from 'react-native';
import AddSvg from '../../../asset/SVG/AddSvg';
import CommonFlotingBotton from '../../../components/common/CommonFlotingBotton';
import UsersChatListComponent from '../../../components/modules/UsersChatListComponent';
import navigationString from '../../../navigation/navigationString';
import {navigate} from '../../../utills/HelperFuncation';

const Message = () => {
  return (
    <View style={{flex: 1}}>
      <CommonFlotingBotton
        onPress={() => navigate(navigationString.GetAvailableUser)}
        Icon={<AddSvg />}
      />
      <UsersChatListComponent />
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({});
