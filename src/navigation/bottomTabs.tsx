import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {spacing} from '../styles/spacing';
import * as Screen from '../screens/index';
import ImagePath from '../utills/ImagePath';
import navigationString from './navigationString';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {textScale} from '../styles/responsiveStyles';

const activeTabColor = '#6753a3';
const inActiveTabColor = '#C8C1DF';
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
    icon: ImagePath.IC_MESSAGE,
    component: Screen.ChatsScreen,
  },
  {
    name: navigationString.UPDATE_SCREEN,
    label: 'Update',
    icon: ImagePath.IC_UPDATE,
    component: Screen.UpdatesScreen,
  },
  {
    name: navigationString.COMMUNITIES_SCREEN,
    label: 'Communities',
    icon: ImagePath.IC_COMMUNITES,
    component: Screen.CommunitiesScreen,
  },
  {
    name: navigationString.CALL_SCREEN,
    label: 'Call',
    icon: ImagePath.IC_CALL,
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
              height: spacing.HEIGHT_64,
            },
            headerShown: false,
          }}>
          {tabData.map((item, index) => {
            return (
              <Tab.Screen
                key={`bottomTabMain_${index.toString()}`}
                name={item.name as keyof BottomTabsRootStackParams}
                component={item.component}
                listeners={{}}
                options={{
                  tabBarLabel: item.label,
                  tabBarIcon: ({focused}) => {
                    return (
                      <View style={{width: spacing.WIDTH_60}}>
                        <View
                          style={[
                            {
                              alignItems: 'center',
                              paddingVertical: spacing.PADDING_4,
                            },
                            focused && styles.focusedIconContainer,
                          ]}
                        />
                        <View style={{marginBottom: spacing.MARGIN_14}}>
                          <Image
                            source={item.icon}
                            style={[
                              styles.iconStyle,
                              focused && {tintColor: '#6753a3'},
                            ]}
                            resizeMode="contain"
                          />

                          <Text
                            style={[
                              styles.label,
                              focused && {color: '#6753a3'},
                            ]}>
                            {item.label}
                          </Text>
                        </View>
                      </View>
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
  iconStyle: {
    height: spacing.HEIGHT_24,
    width: spacing.HEIGHT_24,
    tintColor: '#C8C1DF',
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  focusedIconContainer: {
    borderTopWidth: 5,
    borderTopColor: '#6553A7',
  },
  label: {
    fontSize: textScale(9),
    color: '#C8C1DF',
    opacity: 9,
    alignSelf: 'center',
  },
  badgeStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default React.memo(BottomTabs);
