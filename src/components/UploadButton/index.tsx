import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";


import UploadDropzone from "./UploadDropzone";

const UploadButton = ({isSubscribed}:
  {isSubscribed: boolean}
) => {
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
        <UploadDropzone  isSubscribed={isSubscribed}/>
 
      </DialogContent>
    </Dialog>
  );
};

export default UploadButton;
