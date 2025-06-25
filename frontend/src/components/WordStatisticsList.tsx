import useAuth from "../hooks/useAuth"
import { getRecentWords } from "../services/RecentWordsService"
import { RecentWord } from "../types/types"
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
                        console.log("all words fetched")
                        allWordsFetchedRef.current = true
                    }
                    const recentWordsCombined =
                        recentWordsList.concat(newRecentWords)
                    setRecentWordsList(recentWordsCombined)
                } finally {
                    setTimeout(() => {
                        setLoading(false)
                    }, 2000)
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
            <ul>
                {recentWordsList.map((word, index) => (
                    <ListItem key={index} data={word} />
                ))}
            </ul>
            <div ref={bottomRef} style={{ height: "1px" }} />
            {loading && <LoadingSpinner />}
        </div>
    )
}

const ListItem = ({ data }: { data: RecentWord }) => {
    return <li className={styles.listItem}>{data.word}</li>
}

export default WordsStatisticsList
