import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {FC, useState} from 'react';
import {spacing} from '../../styles/spacing';
import WapperContainer from '../../components/common/WapperContainer';
import TextComp from '../../components/common/TextComp';
import {textScale} from '../../styles/responsiveStyles';
import TextInputComp from '../../components/common/TextInputComp';
import BottonComp from '../../components/common/BottonComp';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthStack';
import GoogleSvg from '../../asset/SVG/GoogleSvg';
import EyeSvg from '../../asset/SVG/EyeSvg';
import HideEyeSvg from '../../asset/SVG/HideEyeSvg';
import PasswordSvg from '../../asset/SVG/PasswordSvg';
import {useLoginMutation} from '../../API/endpoints/authApi';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../../redux/slices/authSlice';
import UserSvg from '../../asset/SVG/UserSvg';
import {showError, showSucess} from '../../utills/HelperFuncation';
import validator from '../../utills/validations';
import navigationString from '../../navigation/navigationString';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  storeItem,
  storeToken,
  TOKEN_KEY,
  USER_DATA,
} from '../../utills/CustomAsyncStorage';

type Props = NativeStackScreenProps<AuthStackParams, 'loginScreen'>;

const Login: FC<Props> = ({navigation}) => {
  const [username, setuserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);
  const [isGoogleLoading, setIsGoogleLoding] = useState<boolean>(false);
  const [login, {isLoading, isError, error, data}] = useLoginMutation();
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
        await storeItem(USER_DATA, response.data);
        await storeToken(response.data.accessToken);
        showSucess(response.message);
        dispatch(
          setUser({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            message: response.message,
          }),
        );
      } catch (err) {
        const errorMessage = (err as {data?: {message?: string}})?.data
          ?.message;
        console.log('error>>', errorMessage);
        showError(errorMessage);
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoding(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const data = {
        email: userInfo.user.email,
        name: userInfo.user.name,
        photo: userInfo.user.photo,
      };
      dispatch(
        setUser({
          user: data,
          accessToken: userInfo.idToken,
          refreshToken: '',
          message: '',
        }),
        setIsGoogleLoding(false),
      );
    } catch (error) {
      setIsGoogleLoding(false);
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            break;
          case statusCodes.IN_PROGRESS:
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            break;
          default:
        }
        console.log(error);
      }
    }
  };

  return (
    <WapperContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              padding: spacing.PADDING_16,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <View>
              <TextComp text={'Lets Sign you in'} style={styles.headerStyle} />
              <TextComp text={'Wellcome back.'} style={styles.descStyle} />
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
                keyboardType="visible-password"
                isTitleIcon={true}
                titleIcon={<PasswordSvg />}
              />
              <TextComp
                style={styles.forgotTextStyle}
                text={'Forgot Password?'}
              />
            </View>

            <View style={styles.loggingWithSocialMedia}>
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
                onPress={handleGoogleLogin}
                isLoading={isGoogleLoading}
                textStyle={{
                  fontSize: textScale(18),
                  color: '#000',
                  marginLeft: spacing.MARGIN_6,
                }}
                ActivityIndicatorColor={'#0B0Eff'}
              />
              <TextComp
                text={`Don't have a account?`}
                style={{
                  alignSelf: 'center',
                  fontSize: textScale(14),
                  color: '#5a5a5a',
                  margintop: spacing.MARGIN_10,
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
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
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
  loggingWithSocialMedia: {},
});
