export const datesEqual = (date1: Date, date2: Date) => {
    if (date1.getUTCDate() !== date2.getUTCDate()) return false
    if (date1.getUTCMonth() !== date2.getUTCMonth()) return false
    if (date1.getUTCFullYear() !== date2.getUTCFullYear()) return false
    return true
}

export function formatTime(totalSeconds: number): string {
    const hours = Math.floor(totalSeconds / 3600)
    totalSeconds %= 3600
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = Math.floor(totalSeconds % 60)
    return `${hours ? String(hours).padStart(2, "0") + "h" : ""}
    
    ${minutes ? String(minutes).padStart(2, "0") + "m" : ""} ${String(
        seconds
    ).padStart(2, "0")}s`
}
