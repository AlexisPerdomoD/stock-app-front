export const validatePassowrd = (password: string) => password.length > 8

export const validateUsername = (username: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(username)
