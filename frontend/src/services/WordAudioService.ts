export default class WordAudioService {
    private directory: string
    private queue: HTMLAudioElement[] = []
    private isPlaying: boolean = false
    private playbackRate: number = 1.0

    constructor(plabackRate?: number, directory: string = "./audio/revere") {
        this.directory = directory
        this.playbackRate = plabackRate || 1
    }

    private getAudio(index: number) {
        return new Audio(`${this.directory}/${index}.mp3`)
    }

    addToQueue(index: number) {
        const audio = this.getAudio(index)

        audio.load()
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
