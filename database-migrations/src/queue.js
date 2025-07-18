export class QueueTimeout {
    executing = false
    constructor(timeout = 1000) {
        this.queue = []
        this.timeout = timeout
    }

    add(fn) {
        this.queue.push(fn)
        this.execute()
    }

    execute() {
        if (this.executing || this.queue.length === 0) {
            return
        }
        this.executing = true
        const fn = this.queue.shift()
        fn()
        setTimeout(() => {
            this.executing = false
            this.execute()
        }, this.timeout)
    }
}
