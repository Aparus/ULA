/* 
first task call to action: 
						"read the text"  
						"listen to the audio"
first task source material: 
						playAudioButton 
						readTextButton

second task call to action: 
						"choose the right variant" 
						"write the text"  
						"write the translation"
second task user input: 
						TextInput 
						VariantButtons
check the answer button 

show progress (position of this exercise in general count)

redirect to the next exercise
*/

import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Button, Text, Input } from 'react-native-elements'
import content from '../../../utils/content'
import Randomizer from '../../../utils/exercises'
import { prefixedIndex } from '../../../utils/utils'
import ChooseFromVariants from './Variants'
import { getTaskText, getPlaceholderText } from './utils'
import CheckAnswerButton from '../../CheckAnswersButton'
import { playAudio } from '../../../utils/playerShortAudios'
import { useSelector } from 'react-redux'

const Single2 = props => {
	// const exerciseInfo = {
	// 	givenType: 'text',
	// 	givenLang: 'translation',
	// 	requiredType: 'audio',
	// 	requiredLang: 'original',
	// 	activityType: 'choose-from-4',
	// 	count: '10',
	// 	chapterId: '001',
	// 	subchapterId: '001',
	// 	phraseIndexes: ['003', '008', '001', '002']
	// }

	const {
		activityType,
		givenLang,
		givenType,
		requiredLang,
		requiredType,
		sourceChapterId: chapterId,
		sourceSubchapterId: subchapterId,
		phraseIndexes,
		//
		userAnswerCorrectness,
		setUserAnswerCorrectness // unknown | correct | incorrect
	} = props

	// console.log('props')
	// console.log(props)

	const [phrases, setPhrases] = useState([])
	const [userAnswer, setUserAnswer] = useState('')
	const { trLang } = useSelector(state => state.translation)

	useEffect(() => {
		const randomizer = new Randomizer(0) // random-js
		const correctPhraseId = prefixedIndex(phraseIndexes[0])
		const shuffledIndexes = randomizer.shuffle(phraseIndexes)

		const original = content.getPhrases(
			chapterId,
			subchapterId,
			shuffledIndexes
		)

		const translation = content.getPhrasesTr(
			chapterId,
			subchapterId,
			shuffledIndexes
		)

		setPhrases({
			original,
			translation,
			correctPhraseId
		})
	}, [trLang])

	const taskText = getTaskText(
		givenType,
		givenLang,
		requiredType,
		requiredLang,
		activityType
	)

	const placeholderText = getPlaceholderText(requiredLang)

	const checkUserAnswerCorrectness = () => {
		let correctAnswer = ''
		if (activityType === 'write') {
			correctAnswer = phrases[requiredLang]?.find(
				phrase => phrase.text === userAnswer
			)?.text
		} else {
			correctAnswer = phrases.correctPhraseId
		}

		if (correctAnswer === userAnswer) {
			setUserAnswerCorrectness('correct')
		} else {
			setUserAnswerCorrectness('incorrect')
		}
	}

	const resetUserAnswerCorrectness = () => {
		setUserAnswerCorrectness('unknown')
	}

	const handleTextInputChange = text => {
		resetUserAnswerCorrectness()
		setUserAnswer(text)
	}

	const handlePlayAudio = () => {
		const filePath = `${chapterId}/${subchapterId}/audios/${phrases.correctPhraseId}`
		const { file: audioFile } = content.getFilesByPathString(filePath) || {}
		playAudio(audioFile, filePath)
	}

	let given // text or audio

	if (givenType === 'audio') {
		given = (
			<Button
				icon={{ name: 'play-arrow', color: 'white' }}
				onPress={handlePlayAudio}
			/>
		)
	} else if (givenType === 'text') {
		const { text } =
			phrases?.[givenLang]?.find(
				phrase => phrase.id === phrases.correctPhraseId
			) || []

		given = <Button title={text} />
	}

	const userInput =
		activityType === 'write' ? (
			<Input
				inputStyle={{ textAlign: 'center' }}
				containerStyle={{ alignSelf: 'center' }}
				placeholder={placeholderText} // translation of the word
				onChangeText={handleTextInputChange}
			/>
		) : (
			<ChooseFromVariants
				variantType={requiredType}
				variants={phrases[requiredLang]}
				setUserAnswer={setUserAnswer}
				correctPhraseId={phrases.correctPhraseId}
				userAnswerCorrectness={userAnswerCorrectness}
				resetUserAnswerCorrectness={resetUserAnswerCorrectness}
				chapterId={chapterId}
				subchapterId={subchapterId}
			/>
		)

	return (
		<>
			<View style={styles.exerciseInstructionContainer}>
				<Text>{taskText}</Text>
			</View>
			{given}
			<View style={styles.inputContainer}>{userInput}</View>
			<CheckAnswerButton
				userAnswerCorrectness={userAnswerCorrectness}
				handleCheckAnswer={checkUserAnswerCorrectness}
			/>
		</>
	)
}

const styles = {
	exerciseInstructionContainer: {
		margin: 20,
		marginLeft: 5,
		marginRight: 5,
		textAlign: 'center'
	},
	inputContainer: {
		margin: 20,
		width: '100%'
	}
}

export default Single2