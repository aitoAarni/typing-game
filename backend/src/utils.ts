import jwt from "jsonwebtoken"
import { WordsPerBucket } from "./types/types"

export const generateToken = (data: any) => {
    const secret = process.env.SECRET

    const token = jwt.sign(data, secret!)
    return token
}

export class HTTPError extends Error {
    status: number
    constructor(status: number, message: string) {
        super(message)
        this.status = status
    }
}

export const raffleBucket = (wordsPerBucket: WordsPerBucket[]) => {
    const initialWeights = [0.2, 0.2, 0.4, 0.2] // new word, 1-3 times typed, 4-6 times typed, 7+ times typed
    wordsPerBucket.forEach(item => {
        if (item.word_count === 0) {
            initialWeights[item.bucket] = 0
        }
    })
    const maxProbability = initialWeights.reduce(
        (prev: number, curre: number) => curre + prev,
        0
    )
    const cumulativeDistribution: number[] = []
    for (let i = 0; i < 4; i++) {
        cumulativeDistribution[i] = 0
        if (i > 0) {
            cumulativeDistribution[i] = cumulativeDistribution[i - 1]
        }
        cumulativeDistribution[i] += initialWeights[i] / maxProbability
    }
    const randomVariable = Math.random()
    for (let i = 0; i < 4; i++) {
        if (randomVariable < cumulativeDistribution[i]) {
            return i
        }
    }
    console.error("Raffle bucket failed, returning 0")
    return 0
}
