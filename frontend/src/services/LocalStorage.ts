const save = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

const load = (key: string): string | null => {
    return localStorage.getItem(key)
}

const setDefinitionId = (id: number) => {
    save("definitionId", id.toString())
}

const getDefinitionId = (): number => {
    const id = load("definitionId")
    if (id) {
        return parseInt(id, 10)
    }
    return 0
}

export { setDefinitionId, getDefinitionId }
