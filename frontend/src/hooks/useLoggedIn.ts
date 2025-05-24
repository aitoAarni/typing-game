import useAuth from "./useAuth"

const useLoggedIn = () => {
    const { token } = useAuth()
    return typeof token == "string"
}

export default useLoggedIn