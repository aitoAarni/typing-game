export default class WordAudioService {
    directory: string
    private queue: HTMLAudioElement[] = []
    private isPlaying: boolean = false

    constructor(directory: string = "./audio/revere") {
        this.directory = directory
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
        audio.play()
        audio.onended = () => {
            this.queue.shift()
            this.isPlaying = false
            this.playAudio()
        }
    }
}
