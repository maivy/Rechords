import { Dimensions, Platform } from 'react-native'

const { width, height } = Dimensions.get('window')

const metrics = {
  width: width,
  height: height,
  marginHorizontal: 10,
  marginVertical: 10,
  section: 25,
  baseMargin: 10,
  doubleBaseMargin: 20,
  miniMargin: 7,
  tinyMargin: 10,
  smallMargin: 15,
  mediumMargin: 20,
  doubleSection: 50,
  horizontalLineHeight: 1,
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 57 : 55,
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
    outerLarge: width * 0.9,
    innerLarge: width * 0.55,
    outerSmall: height / 2.7,
    innerSmall: height / 4.7,
    outerTiny: height * 0.3,   // you can change the size of a tiny record here!
    innerTiny: height * 0.17,
    dot: width * 0.03,
  },
  widths: {
    wide: width * 0.9,
    cover: width * 0.435,
    coverMedium: height / 2.5
  },
  heights: {
    overlay: '40%',
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
