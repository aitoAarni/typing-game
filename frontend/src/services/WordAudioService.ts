export default class WordAudioService {
    private loadedAudio: HTMLAudioElement[] = []
    private queue: HTMLAudioElement[] = []
    private isPlaying: boolean = false
    private baseUrl =
        "https://storage.googleapis.com/typing-app-word-audio/audio"
    private volume: number = NaN
    private speed: number = NaN
    private audioLoaded: boolean = false

    setVolume(volume: number) {
        this.volume = volume
    }

    setSpeed(speed: number) {
        this.speed = speed
    }

    private getAudio(
        definitionWord: string,
        word: string,
        id: number,
        index: number
    ) {
        const url = this.getUrl(id, definitionWord, index, word)
        return new Audio(url)
    }

    private getUrl(
        id: number,
        definitionWord: string,
        index: number,
        word: string
    ) {
        return `${this.baseUrl}/${id}-${definitionWord}/${index}-${word}.mp3`
    }

    loadAudio(definitionWord: string, definitionId: number, words: string[]) {
        words.forEach((word, index) => {
            const audio = this.getAudio(
                definitionWord,
                word,
                definitionId,
                index
            )
            this.loadedAudio.push(audio)
        })
        this.audioLoaded = true
    }

    addToQueue(index: number) {
        const audio = this.loadedAudio[index]
        this.queue.push(audio)
        this.playAudio()
    }

    private playAudio() {
        if (this.queue.length === 0 || this.isPlaying) return
        this.isPlaying = true
        const audio = this.queue[0]

        if (!isNaN(this.speed)) {
            audio.playbackRate = this.speed
        }

        if (!isNaN(this.volume)) {
            audio.volume = this.volume
        }

        audio.play()
        audio.onended = () => {
            this.queue.shift()
            this.isPlaying = false
            this.playAudio()
        }
    }

    getAudioLoaded() {
        return this.audioLoaded
    }
}
