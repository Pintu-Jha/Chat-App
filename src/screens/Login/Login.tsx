import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {FC, useState} from 'react';
import {spacing} from '../../styles/spacing';
// import validator from '../../Utills/validations';
// import {showError} from '../../utills/HelperFuncation';
import WapperContainer from '../../components/common/WapperContainer';
import TextComp from '../../components/common/TextComp';
import {textScale} from '../../styles/responsiveStyles';
import TextInputComp from '../../components/common/TextInputComp';
import BottonComp from '../../components/common/BottonComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthStack';
import GoogleSvg from '../../asset/SVG/GoogleSvg';
import GitHubSvg from '../../asset/SVG/GitHubSvg';
import EyeSvg from '../../asset/SVG/EyeSvg';
import HideEyeSvg from '../../asset/SVG/HideEyeSvg';
import EmailSvg from '../../asset/SVG/EmailSvg';
import PasswordSvg from '../../asset/SVG/PasswordSvg';
import navigationString from '../../navigation/navigationString';

type Props = NativeStackScreenProps<AuthStackParams, 'loginScreen'>;

const Login: FC<Props> = ({navigation}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);
  const [isLoading, setLoading] = useState<boolean>(false);

  // const isValidData = () => {
  //   const error = validator({
  //     email,
  //     password,
  //   });
  //   if (error) {
  //     showError(error);
  //     return false;
  //   }
  //   return true;
  // };
  // const onLogin = async () => {
  //   const checkValid = isValidData();
  //   if (checkValid) {
  //     setLoading(true);
  //     try {
  //       // let fcmToken = await AsyncStorage.getItem('fcm_token');

  //       const res = await userLogin({
  //         email,
  //         password,
  //         // fcmToken
  //       });
  //       // console.log('login api res', res);
  //       setLoading(false);
  //       // if(!!res.data && !res?.data?.validOTP){
  //       //     navigation.navigate(navigationStrings.OTP_VERIFICATION,{data: res.data})
  //       //     return;
  //       // }
  //     } catch (error) {
  //       console.log('error in login api', error);
  //       showError(error?.error);
  //       setLoading(false);
  //     }
  //   }
  // };

  return (
    <WapperContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1, padding: spacing.PADDING_16}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{flex: 1}}>
            <TextComp text={'Lets Sign you in'} style={styles.headerStyle} />
            <TextComp text={'Wellcome back.'} style={styles.descStyle} />
            <TextInputComp
              value={email}
              placeholder={'Enter Email'}
              onChangeText={value => setEmail(value)}
              keyboardType="email-address"
              isTitleIcon={true}
              titleIcon={<EmailSvg />}
            />
            <TextInputComp
              value={password}
              placeholder={'Enter Password'}
              onChangeText={value => setPassword(value)}
              secureTextEntry={secureText}
              secureText={secureText ? <HideEyeSvg /> : <EyeSvg />}
              onPressSecure={() => setSecureText(!secureText)}
              keyboardType="default"
              isTitleIcon={true}
              titleIcon={<PasswordSvg />}
            />
            <TextComp
              style={styles.forgotTextStyle}
              text={'Forgot Password?'}
            />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <View style={styles.loginBtnContainer}>
        <BottonComp
          text={'Login'}
          onPress={() => navigation.navigate(navigationString.SIGNUP_SCREEN)}
          isLoading={isLoading}
          style={{backgroundColor: '#0B0Eff'}}
          textStyle={{fontSize: textScale(18), color: '#fff'}}
        />
      </View>
      <View style={styles.loggingWithSocialMedia}>
        <GoogleSvg style={{marginRight: spacing.MARGIN_12}} />
        <GitHubSvg />
      </View>
    </WapperContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(30),
    color: '#0B0Eff',
    fontWeight: 'bold',
  },
  descStyle: {
    fontSize: textScale(24),
    marginTop: spacing.MARGIN_12,
    marginBottom: spacing.MARGIN_40,
    fontWeight: '500',
  },
  forgotTextStyle: {
    fontSize: textScale(14),
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: 'blue',
  },
  loginBtnContainer: {
    padding: spacing.PADDING_16,
  },
  loggingWithSocialMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: spacing.PADDING_16,
  },
});
