const navigationString = {
  HOME_SCREEN:'homeScreen',
  BOTTON_TAB_BAR:'bottomTabNavigator',
  TOP_TAB_BAR:'TopTabNavigator',
  COLLEGE_SCREEN:'collegeScreen',
  CORPORETION_SCREEN:'corporetionScreen',
  COURSE_SCREEN:'courseScreen',
  EXAM_SCREEN:'examScreen',
  PRACTICE_SCREEN:'practiceScreen',
  MOCK_TEST_List_SCREEN:'mockTestListScreen',
  MOCK_INSTRUCATION_SCREEN:'mockInstrucationScreen',
  MOCK_TEST_SCREEN:'mockTestScreen',
  MOCK_TEST_ACTIVITY_SCREEN:'mockTestActivityScreen',
  MOCK_TEST_SCORE_SCREEN:'mockTestScoreScreen',
  MESSAGE_SCREEN:'messageScreen',
  Request_Links_SCREEN:'requestLinksScreen',
  CHAT_SCREEN:'chatScreen',
  COLLEGE_INNER_PAGE:'collegeInnerPage',
  EDIT_PROFILE:'editProfile',
  LOGIN_SCREEN:'loginScreen',
  SIGNUP_SCREEN:'signupScreen',
  OTP_SCREEN:'optScreen',
  FilterUi:'filterUi',
  EXAM_FILTER_SCREEN:'examFilterScreen',
  College_FILTER_SCREEN:'collegeFilterScreen',
  notification_SCREEN:'notificationScreen',
  Seacrch_Bar_SCREEN:'searchBarScreen',
}as const;

export type NavigationString = typeof navigationString[keyof typeof navigationString];
export default navigationString;

