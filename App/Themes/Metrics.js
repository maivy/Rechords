import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const metrics = {
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  miniMargin: 7,
  tinyMargin: 10,
  smallMargin: 15,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  buttonRadius: 4,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 50
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 200
  },
  record: {
    outer: '100%',
    inner: '55%',
    dot: '3%',
  },
  widths: {
    wide: width * 0.9,
    cover: width * 0.435
  },
  heights: {
    overlay: '50%',
    header: 140,
    sortBy: 116,
  },
  borderRadius: {
    recordCover: 10,
    sortBy: 15,
    search: 10,
  },
}

export default metrics
