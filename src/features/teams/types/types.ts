export interface Team {
    id: number
    name: string
    creator: User,
    members: User[]
}

export interface User {
    id: number,
    username: string,
    email: string
}