import { Project } from './project'
import { Schema } from './schema'
import { Team, User } from './user'

export interface Document {
  id: number
  name: string
  content: string
  progress: number // TODO This is not delivered by the backend
  project: Pick<Project, 'id' | 'name'>
  schema: Pick<Schema, 'id' | 'name'>
  team: Pick<Team, 'id' | 'name'>
  state: DocumentState
}

export interface DocumentState {
  id: number
  type: DocumentStateType
}

export enum DocumentStateType {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  FINISHED = 'FINISHED',
}

export interface DocumentEdit {
  id?: number // TODO id should not be optional. Adjust api endpoint
  document: Pick<Document, 'id' | 'name'>
  mentions: any[] // TODO use mention interface
  relations: any[] // TODO use relation interface
  user?: User // TODO user should not be optional. Adjust api endpoint
}

export const STATUS_STYLES = {
  NEW: 'text-green-600',
  IN_PROGRESS: 'text-blue-600',
  FINISHED: 'text-gray-600',
  Default: 'text-black',
}

// The following is bad practice but required because of the structure of the backend api...
export interface DocumentWrapper {
  documents: Document[]
}
