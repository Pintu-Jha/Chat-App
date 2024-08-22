import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import GetAvailableUserListcomponent from '../../components/modules/GetAvailableUserListcomponent'
import VirtualizedView from '../../components/common/VirtualizedView';

const GetAvailableUser = ({route}:any) => { 
  const {params} = route;
  return (
    <VirtualizedView>
     <GetAvailableUserListcomponent  route={params}/>
    </VirtualizedView>
  )
}

export default GetAvailableUser

const styles = StyleSheet.create({})