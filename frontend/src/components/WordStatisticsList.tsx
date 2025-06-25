import useAuth from "../hooks/useAuth"
import { getRecentWords } from "../services/RecentWordsService"
import { RecentWord } from "../types/types"
import Card from "./Card"
import LoadingSpinner from "./LoadingSpinner"
import styles from "./WordStatisticsList.module.scss"

import { useEffect, useRef, useState } from "react"

const PageSize = 5

const WordsStatisticsList = () => {
    const [recentWordsList, setRecentWordsList] = useState<RecentWord[]>([])
    const { token } = useAuth()
    const [loading, setLoading] = useState<boolean>(false)
    const bottomRef = useRef<HTMLDivElement>(null)
    const allWordsFetchedRef = useRef<boolean>(false)

    useEffect(() => {
        const refElement = bottomRef.current
        const observer = new IntersectionObserver(([entry]) => {
            if (
                entry.isIntersecting &&
                !loading &&
                !allWordsFetchedRef.current
            ) {
                updateRecentWords()
            }
        })

        if (refElement) {
            observer.observe(refElement)
        }

        const updateRecentWords = async () => {
            if (token) {
                try {
                    setLoading(true)

                    const startIndex = recentWordsList.length
                        ? recentWordsList[recentWordsList.length - 1]
                              .row_number + 1
                        : 1
                    const newRecentWords = await getRecentWords(
                        token,
                        startIndex,
                        startIndex + PageSize - 1
                    )
                    if (newRecentWords.length < PageSize) {
                        allWordsFetchedRef.current = true
                    }
                    const recentWordsCombined =
                        recentWordsList.concat(newRecentWords)
                    setRecentWordsList(recentWordsCombined)
                } finally {
                    setLoading(false)
                }
            }
        }
        return () => {
            if (refElement) {
                observer.unobserve(refElement)
            }
        }
    }, [token, loading])

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Recently typed words</h2>
            <ul className={styles.wordList}>
                {recentWordsList.map((word, index) => (
                    <ListItem key={index} data={word} />
                ))}
            </ul>
            <div ref={bottomRef} style={{ height: "1px" }} />
            <div className={styles.bottomContainer}>
                {loading && (
                    <LoadingSpinner
                        style={{
                            top: "10%",
                            left: "50%",
                        }}
                    />
                )}
            </div>
        </div>
    )
}

const ListItem = ({ data }: { data: RecentWord }) => {
    return (
        <li className={styles.listItem}>
            <Card>
                <div className={styles.cardContainer}>
                    <div className={styles.cardNumberContainer}>
                        <p className={styles.cardNumber}>{data.row_number}.</p>
                    </div>
                    <div className={styles.cardVerticalContainer}>
                        <div className={styles.cardUpperContainer}>
                            <p className={styles.word}>{data.word}</p>
                        </div>
                        <div className={styles.cardUpperContainer}>
                            <p className={styles.cellItemSmaller}>
                                typed at: {data.last_typed.toLocaleDateString()}{" "}
                                {data.last_typed.toLocaleTimeString()}
                            </p>
                            <p className={styles.cellItemSmaller}>
                                Typed {data.times_typed} time
                                {data.times_typed !== 1 && "s"}
                            </p>
                        </div>
                        <div className={styles.cardUpperContainer}>
                            <p className={styles.cellItem}>{data.definition}</p>
                        </div>
                    </div>
                    <div className={styles.cardNumberContainer} />
                </div>
            </Card>
        </li>
    )
}

export default WordsStatisticsList
