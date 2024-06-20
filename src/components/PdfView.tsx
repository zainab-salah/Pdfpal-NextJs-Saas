"use client";

import { ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PdfViewProps = {
  url: string;
};

const PdfView = ({ url }: PdfViewProps) => {
  const [numPage, setNumPage] = useState<number>();
  const [curPage, setCurPage] = useState<number>(1);
  const { toast } = useToast();
  const { width = 0, ref } = useResizeDetector();
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="h-14 w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            aria-label=" previous page"
            disabled={curPage <= 1}
            onClick={() => {
              setCurPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
            }}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            <Input className="w-12 h-8" />
            <p className=" text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPage ?? "x"}</span>
            </p>
          </div>
          <Button
            disabled={curPage === numPage || numPage === undefined}
            onClick={() => {
              setCurPage((prev) => (prev + 1 > numPage! ? numPage! : prev + 1));
            }}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <div ref={ref}>
          <Document
            loading={
              <div className="flex justify-center">
                <Loader2 className="my-24 h-6 w-6 animate-spin" />
              </div>
            }
            onLoadError={(error) => {
              console.log(error);
              toast({
                title: "Error loading PDF",
                description: "Please try again later",
                variant: "destructive",
              });
            }}
            onLoadSuccess={({ numPages }) => {
              setNumPage(numPages);
            }}
            file={url}
            className="max-h-full"
          >
            <Page width={width ? width : 1} pageNumber={curPage} />
          </Document>
        </div>
      </div>
    </div>
  );
};

export default PdfView;
