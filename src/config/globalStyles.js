/**
 * You can use custom fonts (otf, ttf) in your app.
 * Why? Read here some theoretical aspects: https://docs.expo.io/guides/using-custom-fonts/
 * Just add them into /content/fonts folder.
 * After `npm run generate-assets` they will be displayed in your app.
 * Here in styles just set {fontFamily: fontFileName} (without extension)
 */

// import { StyleSheet } from 'react-native'
import { colors } from 'react-native-elements'

// general global settings
// related to lang of content, witch you know before running the app
const basicAlign = {
	alignItems: 'flex-start' // 'flex-end' for arabic, hebrew, etc
}

const basicWritingDirection = {
	writingDirection: 'ltr' // 'rtl' for arabic, hebrew, etc
}

const basicFontFamily = {
	fontFamily: 'Inter-Variable' // ScheherezadeNew for arabic (for example)
}

const basicFontSize = 14

const basicFont = fontSizeDelta => ({
	...basicWritingDirection,
	...basicFontFamily,
	fontSize: basicFontSize + fontSizeDelta
})

// styles
const body3 = basicFont(0)
const body2 = basicFont(2)
const body1 = basicFont(4)

const h5 = {
	...basicFont(6),
	fontWeight: 'bold',
	marginTop: 10,
	marginBottom: 5
}
const h4 = {
	...basicFont(8),
	fontWeight: 'bold',
	marginTop: 12,
	marginBottom: 6
}
const h3 = {
	...basicFont(10),
	marginTop: 14,
	marginBottom: 7
}
const subchapterHeader = {
	backgroundColor: colors.primary,
	paddingLeft: 10,
	paddingRight: 10,
	paddingTop: 5,
	paddingBottom: 5,
	borderRadius: 10,
	fontSize: 20,
	color: 'white'
}
const chapterHeader = {
	color: colors.primary,
	display: 'flex',
	alignItems: 'center',
	marginTop: 10,
	marginBottom: 10
}

// translations are related to lang, because user can switch between them
// so you can specify style for each lang
const translation = lang => {
	const defaultStyle = {
		...body3,
		color: colors.grey2
		// textAlign: 'right' // for arabic
	}
	const langStyles = {
		ru: {
			...defaultStyle,
			color: colors.grey3
		}
	}
	return langStyles?.[lang] || defaultStyle
}

const style = {
	body1,
	body2,
	body3,
	h3,
	h4,
	h5,
	chapterHeader,
	subchapterHeader,
	translation,
	basicAlign,
	basicFontFamily,
	basicWritingDirection
}

export default style
