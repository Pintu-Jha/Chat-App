import {StyleSheet, Text, View} from 'react-native';
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
import { setUser } from '../../redux/slices/authSlice';

type Props = NativeStackScreenProps<AuthStackParams, 'signupScreen'>;

const Signup: React.FC<Props> = ({navigation}) => {
  const [username, setUserName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);

  //   const isValidData= () =>{
  //     const error = validator({
  //         userName,
  //         fullName,
  //         email,
  //         password
  //     })
  //     if(error){
  //         showError(error)
  //         return false
  //     }
  //     return true
  // }

  // const onPressSignup = async() =>{

  //     const checkValid = isValidData()

  //     if(checkValid){
  //         setIsLoding(true)
  //         // let fcmToken = await AsyncStorage.getItem('fcm_token');
  //         let data =  {
  //             userName:userName,
  //             fullName:fullName,
  //             email:email,
  //             password:password,
  //             // fcmToken: fcmToken
  //         }
  //         try {
  //             let res =  await userSignup(data)
  //             console.log("resO",res)
  //             setIsLoding(false)
  //             navigation.navigate(navigationString.OTP_VERIFICATION,{data: res.data})
  //         } catch (error) {
  //             console.log("error raised",error)
  //             showError(error?.error || error?.message)
  //             setIsLoding(false)
  //         }
  //     }

  // }

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
          <TextComp text={'Join us for free'} style={styles.headerStyle} />
          <View style={{flexGrow: 0.9}}>
            <TextInputComp
              value={username}
              placeholder={'User Name'}
              onChangeText={value => setUserName(value)}
              isTitleIcon={true}
              titleIcon={<UserSvg />}
            />
            <TextInputComp
              value={fullName}
              placeholder={'Full Name'}
              onChangeText={value => setFullName(value)}
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
          <View style={{}}>
            <BottonComp
              text={'Sign Up'}
              onPress={() => {}}
              isLoading={false}
              style={{backgroundColor: '#0B0Eff'}}
              textStyle={{fontSize: textScale(18), color: '#fff'}}
            />
            <BottonComp
              text={'Sign up with Google'}
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
              text={'Sign up with GitHub'}
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
              text={`Already have a account?`}
              style={{
                alignSelf: 'center',
                fontSize: textScale(14),
                color: '#5a5a5a',
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
      </KeyboardAwareScrollView>
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