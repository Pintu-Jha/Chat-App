import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import WapperContainer from '../../components/common/WapperContainer';
import {spacing} from '../../styles/spacing';
import TextComp from '../../components/common/TextComp';
import TextInputComp from '../../components/common/TextInputComp';
import BottonComp from '../../components/common/BottonComp';
import {textScale} from '../../styles/responsiveStyles';
import navigationString from '../../navigation/navigationString';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParams} from '../../navigation/AuthStack';
import HideEyeSvg from '../../asset/SVG/HideEyeSvg';
import EyeSvg from '../../asset/SVG/EyeSvg';
import UserSvg from '../../asset/SVG/UserSvg';
import EmailSvg from '../../asset/SVG/EmailSvg';
import PasswordSvg from '../../asset/SVG/PasswordSvg';
import GoogleSvg from '../../asset/SVG/GoogleSvg';
import GitHubSvg from '../../asset/SVG/GitHubSvg';
import {useDispatch} from 'react-redux';
import {useSignupMutation} from '../../API/endpoints/authApi';
import validator from '../../utills/validations';
import {showError} from '../../utills/HelperFuncation';
import {setUser} from '../../redux/slices/authSlice';
import {
  GoogleSignin,
  isErrorWithCode,
  statusCodes,
} from '@react-native-google-signin/google-signin';

type Props = NativeStackScreenProps<AuthStackParams, 'signupScreen'>;

const Signup: React.FC<Props> = ({navigation}) => {
  const [username, setUserName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);
  const [isGoogleLoading, setIsGoogleLoding] = useState<boolean>(false);
  const [Signup, {isLoading, isError}] = useSignupMutation();
  const dispatch = useDispatch();

  const isValidData = () => {
    const error = validator({
      email,
      username,
      password,
    });
    if (error) {
      showError(error);
      return false;
    }
    return true;
  };
  const handleSignup = async () => {
    const validations = isValidData();
    if (validations) {
      try {
        const response = await Signup({email, username, password}).unwrap();
        console.log('response>>', response);
        dispatch(
          setUser({
            user: response.data.user,
            accessToken: response.data.accessToken,
            refreshToken: response.data.refreshToken,
            message: response.message,
          }),
        );
      } catch (err) {
        console.error(err);
        console.log(isError);
      }
    }
  };

  const handleGoogleSignUp = async () => {
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
              <TextComp text={'Join us for free'} style={styles.headerStyle} />
              <TextInputComp
                value={username}
                placeholder={'User Name'}
                onChangeText={value => setUserName(value)}
                isTitleIcon={true}
                titleIcon={<UserSvg />}
              />
              <TextInputComp
                value={email}
                placeholder={'Email'}
                onChangeText={value => setEmail(value)}
                isTitleIcon={true}
                titleIcon={<EmailSvg />}
              />
              <TextInputComp
                value={password}
                placeholder={'Password'}
                onChangeText={value => setPassword(value)}
                secureTextEntry={secureText}
                secureText={secureText ? <HideEyeSvg /> : <EyeSvg />}
                onPressSecure={() => setSecureText(!secureText)}
                isTitleIcon={true}
                titleIcon={<PasswordSvg />}
              />
            </View>
            <View>
              <BottonComp
                text={'Sign Up'}
                onPress={handleSignup}
                isLoading={isLoading}
                style={{backgroundColor: '#0B0Eff'}}
                textStyle={{fontSize: textScale(18), color: '#fff'}}
              />
              <BottonComp
                text={'Sign up with Google'}
                isleftImg={true}
                leftSvg={<GoogleSvg />}
                onPress={handleGoogleSignUp}
                isLoading={isGoogleLoading}
                textStyle={{
                  fontSize: textScale(18),
                  color: '#000',
                  marginLeft: spacing.MARGIN_6,
                }}
                ActivityIndicatorColor="#0B0Eff"
              />
              <TextComp
                text={`Already have a account?`}
                style={{
                  alignSelf: 'center',
                  fontSize: textScale(14),
                  color: '#5a5a5a',
                  margintop: spacing.MARGIN_10,
                }}>
                <Text
                  style={{color: '#1c20c8'}}
                  onPress={() =>
                    navigation.navigate(navigationString.LOGIN_SCREEN)
                  }>
                  Login
                </Text>
              </TextComp>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </WapperContainer>
  );
};

export default Signup;

const styles = StyleSheet.create({
  headerStyle: {
    fontSize: textScale(26),
    color: '#0B0Eff',
    fontWeight: 'bold',
    marginBottom: spacing.MARGIN_16,
  },
  descStyle: {
    fontSize: textScale(14),
    // fontFamily: fontFamily.regular,
    marginTop: spacing.MARGIN_12,
    marginBottom: spacing.MARGIN_50,
  },
  loginBtnContainer: {
    padding: spacing.PADDING_16,
  },
});
