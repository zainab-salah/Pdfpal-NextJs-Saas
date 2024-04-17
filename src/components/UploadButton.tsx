import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";

const UploadButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Upload PDF</h2>
          <input type="file" />
          <Button onClick={() => setOpen(false)}>Upload</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
