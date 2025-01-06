// types.ts

// Définition du type Document
export interface Document {
  id: number;         // Identifiant unique pour chaque document
  name: string;       // Nom du document
  content: string;    // Contenu du document
  progress: number;   // Progrès du document (par exemple, de 0 à 100)
  project: string;   // Optionnel, associe le document à un projet
  schema: string;    // Optionnel, associe le document à un schéma spécifique
}

// Définition d'un ensemble de documents
export interface Documents {
  ongoing: Document[];   // Documents en cours
  open: Document[];      // Documents ouverts
  completed: Document[]; // Documents terminés
}

// Définition d'un projet avec ses documents
export interface Project {
  title: string;         // Titre du projet
  schema: string;        // Schéma associé au projet
  team: string;          // Équipe travaillant sur le projet
  documents: Documents;  // Documents du projet, classés par statut
}
