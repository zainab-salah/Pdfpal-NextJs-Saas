"use client";
import {
  ChevronDown,
  ChevronUp,
  Loader2,
  RotateCw,
  Search,
} from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import { useResizeDetector } from "react-resize-detector";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { useToast } from "./ui/use-toast";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import SimpleBar from "simplebar-react";
import PdfFullScreen from "./PdfFullScreen";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PdfViewProps = {
  url: string;
};

const PdfView = ({ url }: PdfViewProps) => {
  const [numPage, setNumPage] = useState<number>();
  const [curPage, setCurPage] = useState<number>(1);
  const [zoom, setZoom] = useState<number>(1);
  const [rotation, setRotation] = useState<number>(0);
  const [renderedScale, setRenderedScale] = useState<
  number | null
>(null)
  const { toast } = useToast();
  const isLoading = renderedScale !== zoom
  const PageNumberSchema = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= numPage!),
  });
  type TCPageNumberSchema = z.infer<typeof PageNumberSchema>;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCPageNumberSchema>({
    defaultValues: {
      page: "1",
    },
    resolver: zodResolver(PageNumberSchema),
  });
  const { width, ref } = useResizeDetector();
  const handlePageSubmit = handleSubmit(({ page }: TCPageNumberSchema) => {
    setCurPage(Number(page));
    setValue("page", String(page));
  });
  return (
    <div className="w-full bg-white rounded-md shadow flex flex-col items-center">
      <div className="sm:h-14 h-full w-full border-b border-zinc-200 flex items-center justify-between px-2">
        <div className="flex items-center gap-1.5">
          <Button
            variant="ghost"
            aria-label=" previous page"
            disabled={curPage <= 1}
            onClick={() => {
              setCurPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue("page", String(curPage - 1));
            }}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-1.5">
            <Input
              {...register("page")}
              className={cn(
                "w-12 h-8",
                errors.page && " focus-visible:ring-red-500"
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePageSubmit();
                }
              }}
            />
            <p className=" text-zinc-700 text-sm space-x-1">
              <span>/</span>
              <span>{numPage ?? "x"}</span>
            </p>
          </div>
          <Button
            disabled={curPage === numPage || numPage === undefined}
            onClick={() => {
              setCurPage((prev) => (prev + 1 > numPage! ? numPage! : prev + 1));
              setValue("page", String(curPage + 1));
            }}
            variant="ghost"
            aria-label="next page"
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button aria-label="zoom" className="gap-1.5" variant="ghost">
                <Search className="h-4 w-4" />
                
                {zoom * 100}% <ChevronDown className="h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => {
                  setZoom(0.5);
                }}
              >
                50%
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setZoom(1);
                }}
              >
                100%
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setZoom(1.25);
                }}
              >
                125%
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setZoom(1.5);
                }}
              >
                150%
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setZoom(2);
                }}
              >
                200%
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setZoom(2.5);
                }}
              >
                250%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            aria-label="rotate 90 degrees"
            onClick={() => setRotation((prev) => prev + 90)}
            variant="ghost"
          >
            <RotateCw className="h-4 w-4" />
          </Button>
          <PdfFullScreen fileUrl={url} />
        </div>
      </div>

      <div className="flex-1 w-full max-h-screen">
        <SimpleBar autoHide={false} className="max-h-[calc(100vh-10rem)]">
          <div ref={ref}>
            <Document
              loading={
                <div className="flex justify-center">
                  <Loader2 className="my-24 h-6 w-6 animate-spin" />
                </div>
              }
              onLoadError={(error) => {
               
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
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  scale={zoom}
                  pageNumber={curPage}
                  rotate={rotation}
                />
              ) : null}

<Page
                className={cn(isLoading ? 'hidden' : '')}
                width={width ? width : 1}
                pageNumber={curPage}
                scale={zoom}
                rotate={rotation}
                key={'@' + zoom}
                loading={
                  <div className='flex justify-center'>
                    <Loader2 className='my-24 h-6 w-6 animate-spin' />
                  </div>
                }
                onRenderSuccess={() =>
                  setRenderedScale(zoom)
                }
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfView;
