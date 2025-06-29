export default class WordAudioService {
    private loadedAudio: HTMLAudioElement[] = []
    private queue: HTMLAudioElement[] = []
    private isPlaying: boolean = false
    private playbackRate: number = 1.0
    private baseUrl =
        "https://storage.googleapis.com/typing-app-word-audio/audio"

    constructor(playbackRate?: number) {
        this.playbackRate = playbackRate || 1
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
        audio.playbackRate = this.playbackRate
        audio.play()
        audio.onended = () => {
            this.queue.shift()
            this.isPlaying = false
            this.playAudio()
        }
    }
}
