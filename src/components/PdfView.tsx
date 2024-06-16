
"use client"

import { Loader2 } from "lucide-react";
import { Document, Page ,pdfjs } from "react-pdf";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useToast } from "./ui/use-toast";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


type PdfViewProps = {
  url: string;
};


const PdfView = ({ url }: PdfViewProps) => {
  const {toast} = useToast();
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">TopPAr</div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div>
          <Document
      loading={
        <div className='flex justify-center'>
          <Loader2 className='my-24 h-6 w-6 animate-spin' />
        </div>
      }
      onLoadError={(error) => {
        console.log(error)
        toast({
          title: 'Error loading PDF',
          description: 'Please try again later',
          variant: 'destructive',
        })
      }}
          file={url} className="max-h-full" >
            <Page pageNumber={1}  />
            </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
