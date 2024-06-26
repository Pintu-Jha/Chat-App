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

type Props = NativeStackScreenProps<AuthStackParams, 'signupScreen'>;

const Signup: React.FC<Props> = ({navigation}) => {
  const [userName, setUserName] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);
  const [isLoding, setIsLoding] = useState<boolean>(false);

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

  return (
    <WapperContainer>
      <KeyboardAwareScrollView>
        <View style={{padding: spacing.PADDING_16}}>
          <TextComp text={'Join us for free'} style={styles.headerStyle} />
          <View style={{marginTop: spacing.MARGIN_84}}>
            <TextInputComp
              value={userName}
              placeholder={'UserName'}
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
            <TextInputComp
              value={confirmPassword}
              placeholder={'Confirm Password'}
              onChangeText={value => setConfirmPassword(value)}
              secureTextEntry={secureText}
              secureText={secureText ? <HideEyeSvg /> : <EyeSvg />}
              onPressSecure={() => setSecureText(!secureText)}
              isTitleIcon={true}
              titleIcon={<PasswordSvg />}
            />
          </View>
          <BottonComp
            text={'Sign Up'}
            style={{marginTop: spacing.MARGIN_30, backgroundColor: '#0B0Eff'}}
            onPress={() => navigation.navigate(navigationString.LOGIN_SCREEN)}
            isLoading={isLoding}
            textStyle={{fontSize: textScale(18), color: '#fff'}}
          />
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
  },
  descStyle: {
    fontSize: textScale(14),
    // fontFamily: fontFamily.regular,
    marginTop: spacing.MARGIN_12,
    marginBottom: spacing.MARGIN_50,
  },
});
