import React from 'react'
import { ScrollView, View } from 'react-native'
import { Button } from 'react-native-elements'
import ChapterHeader from '../ChapterHeader'
import layoutStylesModule from '../../config/styles/layout'

const ChapterSubchaptersListScreen = props => {
	const {
		route: {
			params: { chapterId, subchapters }
		},
		navigation
	} = props

	const chapterHeaderProps = {
		navigation,
		chapterId
	}
	const { subchaptersListScreen: layoutStyles } = layoutStylesModule

	return (
		<View>
			<ChapterHeader {...chapterHeaderProps} />
			<ScrollView contentContainerStyle={layoutStyles.screenContainer}>
				<View style={layoutStyles.listContainer}>
					{subchapters.map(elem => {
						const { id, title, type } = elem
						const name = `subchapter-${id}`
						return (
							<Button
								containerStyle={layoutStyles.subchapterButton}
								key={name}
								title={`${id}-${title} [${type}]`}
								onPress={() => navigation.navigate(name)}
							/>
						)
					})}
				</View>
			</ScrollView>
		</View>
	)
}

export default ChapterSubchaptersListScreen