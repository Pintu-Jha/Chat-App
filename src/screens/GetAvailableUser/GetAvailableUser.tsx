import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import GetAvailableUserListcomponent from '../../components/modules/GetAvailableUserListcomponent'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRootStackParams } from '../../navigation/MainStack';
import navigationString from '../../navigation/navigationString';

type Props = NativeStackScreenProps<MainRootStackParams, typeof navigationString.GetAvailableUser>;

const GetAvailableUser:FC<Props> = ({navigation,route}) => { 
  return (
    <View>
     <GetAvailableUserListcomponent navigation={navigation} route={route}/>
    </View>
  )
}

export default GetAvailableUser

const styles = StyleSheet.create({})