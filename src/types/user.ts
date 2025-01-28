export interface Team {
  id: number
  name: string
  creator: User
  members: User[]
}

export interface User {
  id: number
  username: string
  email: string
}

// The following is bad practice but required because of the structure of the backend api...
export interface TeamsWrapper {
  teams: Team[]
}
