import { Dimensions, Platform, StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const scale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (scale(size) - size) * factor;
const moderateScaleVertical = (size: number, factor = 0.5) => size + (verticalScale(size) - size) * factor;
const textScale = (percent: number) => { return RFValue(percent, guidelineBaseHeight) };
// const textScale = percent => {
// 	const screenHeight = Dimensions.get('window').height;
// 	//calculate absolute ratio for bigger screens 18.5:9 requiring smaller scaling
// 	const ratio = screenHeight / Dimensions.get('window').width;
// 	//Guideline sizes are based on standard ~5″ screen mobile device
// 	const deviceHeight = 375
// 		? screenHeight * (ratio > 1.8 ? 0.126 : 0.15) //Set guideline depending on absolute ratio
// 		: Platform.OS === 'android'
// 			? screenHeight - StatusBar.currentHeight
// 			: screenHeight;

// 	const heightPercent = (percent * deviceHeight) / 100;
// 	return Math.round(heightPercent);
// };

export { scale, verticalScale, textScale, moderateScale, moderateScaleVertical, width, height };