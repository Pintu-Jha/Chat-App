import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import Header from '../../../components/common/Header';
import CommonFlotingBotton from '../../../components/common/CommonFlotingBotton';
import {MainRootStackParams} from '../../../navigation/MainStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import navigationString from '../../../navigation/navigationString';
import UsersChatListComponent from '../../../components/modules/UsersChatListComponent';
import {useDispatch} from 'react-redux';
import {logout} from '../../../redux/slices/authSlice';
import CameraSvg from '../../../asset/SVG/CameraSvg';
import QrCodeSvg from '../../../asset/SVG/QrCodeSvg';
import {
  moderateScale,
  scale,
  textScale,
  verticalScale,
} from '../../../styles/responsiveStyles';
import TextComp from '../../../components/common/TextComp';

type Props = NativeStackScreenProps<MainRootStackParams, 'getAvailableUser'>;

const Message: FC<Props> = ({navigation, route}) => {
  const [isToggalMenuBotton, setIsToggalMenuBotton] = useState<boolean>(false);
  const ToggalMenuBotton = () => {
    setIsToggalMenuBotton(!isToggalMenuBotton);
  };
  return (
    <View style={{flex: 1}}>
      <Header
        text="ChatApp"
        onPressMeanu={ToggalMenuBotton}
        isForthIcon={true}
        isRightHeaderContainer={false}
        isThirdIcon={true}
        thirdIcon={<CameraSvg />}
        isSecondIcon={true}
        secondIcon={<QrCodeSvg />}
      />
      <CommonFlotingBotton
        onPress={() => navigation.navigate(navigationString.GetAvailableUser)}
      />
      <UsersChatListComponent navigation={navigation} route={route} />
      {isToggalMenuBotton ? (
        <View style={styles.menuToggalBotton}>
          <TextComp
            text="Profile"
            style={{fontSize: textScale(20)}}
            onPress={() => {
              navigation.navigate(navigationString.Profile_Screen),
                setIsToggalMenuBotton(false);
            }}
          />
        </View>
      ) : null}
    </View>
  );
};

export default Message;

const styles = StyleSheet.create({
  menuToggalBotton: {
    backgroundColor: '#fff',
    position: 'absolute',
    paddingVertical: moderateScale(10),
    paddingRight: moderateScale(50),
    paddingLeft: moderateScale(15),
    top: verticalScale(45),
    right: scale(15),
  },
});
