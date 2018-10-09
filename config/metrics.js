import { Dimensions, Platform } from 'react-native'

const IS_ANDROID = Platform.OS === 'android'
const { height, width } = Dimensions.get('window')




module.exports = Object.freeze({
    ANDROID_STATUSBAR: 24,
    DEVICE_HEIGHT: IS_ANDROID ? height - 24 : height,
    DEVICE_WIDTH: width
});