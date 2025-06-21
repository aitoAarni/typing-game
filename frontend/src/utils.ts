
export const datesEqual = (date1: Date, date2: Date) => {
    if (date1.getDate() !== date2.getDate()) return false
    if (date1.getMonth() !== date2.getMonth()) return false
    if (date1.getFullYear() !== date2.getFullYear()) return false
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
