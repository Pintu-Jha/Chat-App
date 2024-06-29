const navigationString = {
  BOTTON_TAB_BAR: 'bottomTabNavigator',
  UPDATE_SCREEN: 'updateScreen',
  COMMUNITIES_SCREEN: 'corporetionScreen',
  CALL_SCREEN: 'callScreen',
  MESSAGE_SCREEN: 'messageScreen',
  LOGIN_SCREEN:'loginScreen',
  SIGNUP_SCREEN:'signupScreen'
} as const;

export type NavigationString =
  (typeof navigationString)[keyof typeof navigationString];
export default navigationString;
