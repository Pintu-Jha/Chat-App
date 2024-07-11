import React, {FC, useRef} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {spacing} from '../styles/spacing';
import * as Screen from '../screens/index';
import navigationString from './navigationString';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {textScale} from '../styles/responsiveStyles';
import ChatSvg from '../asset/SVG/ChatSvg';
import UpdateSvg from '../asset/SVG/UpdateSvg';
import CommunitiesSvg from '../asset/SVG/CommunitiesSvg';
import CallSvg from '../asset/SVG/CallSvg';

const activeTabColor = '#000';
const inActiveTabColor = '#000';
const tabBarColor = '#fffefe';

export type BottomTabsRootStackParams = {
  Message: undefined;
  Update: undefined;
  Communities: undefined;
  Call: undefined;
};
const Tab = createBottomTabNavigator<BottomTabsRootStackParams>();

const tabData = [
  {
    name: navigationString.MESSAGE_SCREEN,
    label: 'Message',
    icon: <ChatSvg />,
    component: Screen.messageScreen,
  },
  {
    name: navigationString.UPDATE_SCREEN,
    label: 'Updates',
    icon: <UpdateSvg />,
    component: Screen.UpdatesScreen,
  },
  {
    name: navigationString.COMMUNITIES_SCREEN,
    label: 'Communities',
    icon: <CommunitiesSvg />,
    component: Screen.CommunitiesScreen,
  },
  {
    name: navigationString.CALL_SCREEN,
    label: 'Calls',
    icon: <CallSvg />,
    component: Screen.CallsScreen,
  },
];

function BottomTabs() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarActiveTintColor: activeTabColor,
            tabBarInactiveTintColor: inActiveTabColor,

            tabBarStyle: {
              backgroundColor: tabBarColor,
              paddingBottom: 0,
              height: spacing.HEIGHT_70,
            },

            headerShown: false,
          }}>
          {tabData.map((item, index) => {
            return (
              <Tab.Screen
                key={`bottomTabMain_${index.toString()}`}
                name={item.name as keyof BottomTabsRootStackParams}
                component={item.component}
                listeners={({navigation, route}) => ({})}
                options={{
                  tabBarLabel: item.label,
                  tabBarIcon: ({focused}) => {
                    return (
                      <>
                        <View
                          style={[
                            styles.iconContainerStyle,
                            focused && {
                              backgroundColor: '#0cfa0c',
                              width: spacing.WIDTH_54,
                              height: spacing.HEIGHT_32,
                              borderRadius: spacing.RADIUS_16,
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: 0.3,
                            },
                          ]}>
                          <Text style={styles.iconStyle}>{item.icon}</Text>
                        </View>
                        <Text
                          style={[
                            styles.label,
                            focused && {color: '#000', fontWeight: 'bold'},
                          ]}>
                          {item.label}
                        </Text>
                      </>
                    );
                  },
                }}
              />
            );
          })}
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  iconContainerStyle: {
    width: spacing.WIDTH_54,
    height: spacing.HEIGHT_32,
    borderRadius: spacing.RADIUS_16,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  label: {
    fontSize: textScale(14),
    color: '#000',
    opacity: 9,
    alignSelf: 'center',
  },
  iconStyle: {
    alignSelf: 'center',
  },
});

export default React.memo(BottomTabs);
