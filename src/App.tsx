import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Index from '../src/navigation/index'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import FlashMessage from 'react-native-flash-message'
import { textScale } from './styles/responsiveStyles'

const App = () => {
  return (
    <Provider store={store}>
     <Index/>
     <FlashMessage
        position={'top'}
        titleStyle={{
          fontSize:textScale(14)
        }}
      />
     </Provider>
  )
}

export default App

const styles = StyleSheet.create({})