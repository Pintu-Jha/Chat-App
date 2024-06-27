import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
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
import PasswordSvg from '../../asset/SVG/PasswordSvg';
import {useLoginMutation} from '../../API/endpoints/authApi';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/slices/authSlice';
import UserSvg from '../../asset/SVG/UserSvg';
import {showError} from '../../utills/HelperFuncation';
import validator from '../../utills/validations';
import navigationString from '../../navigation/navigationString';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type Props = NativeStackScreenProps<AuthStackParams, 'loginScreen'>;

const Login: FC<Props> = ({navigation}) => {
  const [username, setuserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);

  const [login, {isLoading, isError}] = useLoginMutation();
  const dispatch = useDispatch();

  const isValidData = () => {
    const error = validator({
      username,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };
  const handleLogin = async () => {
    const validations = isValidData();
    if (validations) {
      try {
        const response = await login({password, username}).unwrap();
        console.log('response>>', response);
        dispatch(
          setUser({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            message: response.message,
            success: response.success,
          }),
        );
      } catch (err) {
        console.error(err);
        console.log(isError);
      }
    }
  };

  return (
    <WapperContainer>
      <KeyboardAwareScrollView>
        <View
          style={{padding: spacing.PADDING_16, height: spacing.FULL_HEIGHT}}>
          <TextComp text={'Lets Sign you in'} style={styles.headerStyle} />
          <TextComp text={'Wellcome back.'} style={styles.descStyle} />
          <View style={{flexGrow: 0.92}}>
            <TextInputComp
              value={username}
              placeholder={'Enter UserName'}
              onChangeText={value => setuserName(value)}
              keyboardType="default"
              isTitleIcon={true}
              titleIcon={<UserSvg />}
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

          <View style={styles.loginBtnContainer}>
            <BottonComp
              text={'Login'}
              onPress={handleLogin}
              isLoading={isLoading}
              style={{backgroundColor: '#0B0Eff'}}
              textStyle={{fontSize: textScale(18), color: '#fff'}}
            />
            <BottonComp
              text={'Sign in with Google'}
              isleftImg={true}
              leftSvg={<GoogleSvg />}
              onPress={() => {}}
              // isLoading={isLoading}
              textStyle={{
                fontSize: textScale(18),
                color: '#000',
                marginLeft: spacing.MARGIN_6,
              }}
            />
            <BottonComp
              text={'Sign in with GitHub'}
              isleftImg={true}
              leftSvg={<GitHubSvg />}
              onPress={() => {}}
              // isLoading={isLoading}
              textStyle={{
                fontSize: textScale(18),
                color: '#000',
                marginLeft: spacing.MARGIN_6,
              }}
            />
            <TextComp
              text={`Don't have a account?`}
              style={{
                alignSelf: 'center',
                fontSize: textScale(14),
                color: '#5a5a5a',
              }}>
              <Text
                style={{color: '#1c20c8'}}
                onPress={() =>
                  navigation.navigate(navigationString.SIGNUP_SCREEN)
                }>
                Sign up
              </Text>
            </TextComp>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </WapperContainer>
  );
};

export default Login;

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(26),
    color: '#0B0Eff',
    fontWeight: 'bold',
    marginTop: spacing.MARGIN_16,
  },
  descStyle: {
    fontSize: textScale(24),
    fontWeight: '500',
    marginBottom: spacing.MARGIN_16,
  },
  forgotTextStyle: {
    fontSize: textScale(14),
    fontWeight: '500',
    alignSelf: 'flex-end',
    color: 'blue',
  },
  loginBtnContainer: {},
  loggingWithSocialMedia: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
