import { Schema } from './schema'
import { Team, User } from './user'
import { Document } from './document'

export interface Project {
  id: number
  name: string
  schema: Pick<Schema, 'id' | 'name'>
  team: Pick<Team, 'id' | 'name'>
  creator: User
  documents?: Document[]
}

// The following is bad practice but required because of the structure of the backend api...
export interface ProjectWrapper {
  projects: Project[]
}
