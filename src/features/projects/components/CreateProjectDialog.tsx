import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Schema } from "@/types/schema";
import { Team } from "@/types/user";
import { FormEvent, useState } from "react";

interface CreateProjectDialogProps {
  teams: Team[];        
  schemas: Schema[];              
  handleCreateProject: (name: string, teamId: number, schemaId: number) => Promise<void> | void;
}

export function CreateProjectDialog({ teams, schemas, handleCreateProject }: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  async function onSubmit(name: string, teamId: number, schemaId: number) {
    setIsSaving(true);
    try {
      await handleCreateProject(name, teamId, schemaId);
      setOpen(false)
    } catch {
      setError("Something went wrong while creating the project. Please try again.")
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Project</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Provide a name, team, and schema for your new project.
          </DialogDescription>
        </DialogHeader>

        <CreateProjectForm
          teams={teams}
          schemas={schemas}
          isSaving={isSaving}
          error={error}
          onCancel={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  )
}

interface CreateProjectFormProps {
  teams: Team[];
  schemas: Schema[];
  isSaving: boolean;
  error: string | null;
  onCancel: () => void;
  onSubmit: (name: string, teamId: number, schemaId: number) => void;
}

function CreateProjectForm({
  teams,
  schemas,
  isSaving,
  error,
  onCancel,
  onSubmit,
}: CreateProjectFormProps) {

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const projectName = formData.get('projectName') as string; // "Name" Input
    const teamId = Number(formData.get('teamId'));            // "Team" Select
    const schemaId = Number(formData.get('schemaId'));        // "Schema" Select

    onSubmit(projectName, teamId, schemaId);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="project-name" className="text-right">
            Name
          </Label>
          <Input
            id="project-name"
            name="projectName"
            placeholder="Project name"
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="team-select" className="text-right">
            Team
          </Label>
          <Select name="teamId">
            <SelectTrigger id="team-select" className="col-span-3">
              <SelectValue placeholder="Select a team" />
            </SelectTrigger>
            <SelectContent>
              {teams.map((team) => (
                <SelectItem key={team.id} value={String(team.id)}>
                  {team.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="schema-select" className="text-right">
            Schema
          </Label>
          <Select name="schemaId">
            <SelectTrigger id="schema-select" className="col-span-3">
              <SelectValue placeholder="Select a schema" />
            </SelectTrigger>
            <SelectContent>
              {schemas.map((schema) => (
                <SelectItem key={schema.id} value={String(schema.id)}>
                  {schema.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DialogFooter>
        <Button variant="outline" onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  )
}