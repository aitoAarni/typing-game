import fs from "fs/promises"

const values = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
]

class QueueTimeout {
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

