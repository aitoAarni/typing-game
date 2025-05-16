const getRemoteWordDefinition = async (id: number): Promise<string> => {
    const response = new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve("hello world " + id)
        }, 10000)
    })
    return response
}

export { getRemoteWordDefinition }
