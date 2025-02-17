import Loader from "@/components/Loader"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import { useState } from "react"
import FadeLoader from "react-spinners/FadeLoader"


interface CreateDocumentDialogProps {
  handleCreateDocument: (name: string, content: string) => Promise<void> | void;
}

export function CreateDocumentDialog({ handleCreateDocument }: CreateDocumentDialogProps) {
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(name: string, content: string) {
    setIsSaving(true);
    try {
      await handleCreateDocument(name, content);
      setOpen(false);
    } catch {
      setError("Something went wrong while creating the document. Please try again.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Create Document</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] w-full h-auto">
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription>
            Please provide a name and content for your new document.
          </DialogDescription>
        </DialogHeader>

        <CreateDocumentForm
          isSaving={isSaving}
          error={error}
          onCancel={() => setOpen(false)}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}

interface CreateDocumentFormProps {
  isSaving: boolean;
  error: string | null;
  onCancel: () => void;
  onSubmit: (name: string, content: string) => void;
}

function CreateDocumentForm({ isSaving, error, onCancel, onSubmit }: CreateDocumentFormProps) {

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const content = formData.get('content') as string;
    onSubmit(name, content);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white sm:max-w-[600px] w-full h-auto">
      <div className="grid gap-4 py-4 item">
        <div>
          <label htmlFor="doc-name" className="text-right">
            Name
          </label>
          <Input
            id="doc-name"
            name="name"
            placeholder="Document name"
            className="col-span-3 h-12 text-lg px-4"
          />
        </div>
        <div >
          <label htmlFor="doc-content" className="text-right">
            Content
          </label>
          <Textarea
            id="doc-content"
            name="content"
            placeholder="Document content..."
            className="col-span-3 h-32 text-lg px-4"
          />
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <DialogFooter>
        <Button onClick={onCancel} type="button">
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? <Loader/> : 'Save changes'}
        </Button>
      </DialogFooter>
    </form>
  );
}