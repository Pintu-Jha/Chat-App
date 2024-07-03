import {StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import Index from '../src/navigation/index';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import FlashMessage from 'react-native-flash-message';
import {textScale} from './styles/responsiveStyles';
import {USER_DATA, retrieveItem} from './utills/CustomAsyncStorage';
import {setUser} from './redux/slices/authSlice';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import LoadingScreen from './components/common/Loader';
const {dispatch} = store;

GoogleSignin.configure({
  webClientId:
    '11593219429-69ju69imhbpq43g73t01lfmr27pekifg.apps.googleusercontent.com',
  offlineAccess: false,
});
const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initUser();

    const loadApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLoading(false);
    };

    loadApp();
  }, []);

  const initUser = async () => {
    try {
      let data = await retrieveItem(USER_DATA);
      if (!!data) {
        dispatch(setUser(data));
      }
    } catch (error) {
      console.log('no data found');
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }
  return (
    <Provider store={store}>
      <Index />
      <FlashMessage
        position={'top'}
        titleStyle={{
          fontSize: textScale(14),
        }}
      />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
