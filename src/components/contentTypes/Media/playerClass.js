import { Audio } from 'expo-av'
import { Alert } from 'react-native'
import mitt from 'mitt'

class Player {
	constructor(audioFile, phrases) {
		// this.init(audioId, contentType)
	}

	mediaObject = null
	currentPhraseNum = 0
	currentTime = 0
	events = mitt()

	onPlayAudioUpdate = playbackStatus => {
		const {
			positionMillis,
			durationMillis,
			isPlaying,
			didJustFinish
		} = playbackStatus
		// console.log('playbackStatus', playbackStatus)
		const currentTime = positionMillis / 1000
		const playingProgressPercent = (positionMillis / durationMillis) * 100
		// const { isPlaying } = playbackStatus
		// this.isPlaying = isPlaying
		this.currentTime = currentTime

		this.setPlayerState(prevState => ({
			...prevState,
			isPlaying,
			currentTime,
			playingProgressPercent
		}))

		if (didJustFinish) {
			this.events.emit('didJustFinish')
		}
	}

	async init(audioFile, setPlayerState) {
		if (audioFile) {
			const mediaObject = new Audio.Sound()
			await mediaObject.loadAsync(audioFile, {
				shouldCorrectPitch: true,
				pitchCorrectionQuality: 'High',
				progressUpdateIntervalMillis: 100
			})
			this.setPlayerState = setPlayerState
			this.mediaObject = mediaObject
			this.events.emit('isReady', this)
			setTimeout(() => {
				mediaObject.getStatusAsync().then(status => {
					const { durationMillis } = status
					const duration = durationMillis / 1000
					setPlayerState(prevState => ({ ...prevState, duration }))
				})
			}, 1000)
		} else {
			const messages = [`Audio doesn't exist`, `Please, contact the admin`]
			console.log(...messages)
			Alert(...messages)
		}
	}

	async play() {
		this.mediaObject.setOnPlaybackStatusUpdate(this.onPlayAudioUpdate)
		this.mediaObject.playAsync()
		this.events.emit('play')
	}
	async pause() {
		this.mediaObject.pauseAsync()
		this.events.emit('pause')
	}

	playPlus10() {
		this.setStatus({ positionMillis: (this.currentTime + 10) * 1000 })
	}
	playMinus10() {
		this.setStatus({ positionMillis: (this.currentTime - 10) * 1000 })
	}

	async setStatus(settings) {
		this.mediaObject.setStatusAsync({ ...settings })
	}
	async getStatus() {
		return this.mediaObject.getStatusAsync()
	}
}

export default Player
