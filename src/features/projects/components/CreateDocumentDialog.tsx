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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DialogClose } from "@radix-ui/react-dialog"
import { useState } from "react"

interface CreateDocumentDialogProps {
  handleCreateDocument: (name: string, content: string) => void
}

export const CreateDocumentDialog = ({ handleCreateDocument }: CreateDocumentDialogProps) => {
  const [name, setName] = useState('')
  const [content, setContent] = useState('')

  const resetFields = () => {
    setName('')
    setContent('')
  }

  const onSubmit = () => {
    handleCreateDocument(name, content)
    resetFields()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Document</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
          <DialogDescription>
            Provide a name and content for the new document.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Content
            </Label>
            <Textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="submit" onClick={onSubmit}>Create</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
