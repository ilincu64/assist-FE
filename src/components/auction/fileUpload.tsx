import { useState } from "react";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./upload";

const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
        <span className="font-semibold">Click to upload</span>
        &nbsp; or drag and drop
      </p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        PDF, WORD or EXC
      </p>
    </>
  );
};

type FileUploaderTestProps = {
  initialValues: File[] | null;
  onValueChange: (files: File[] | null) => void;
};

const FileUploaderTest: React.FC<FileUploaderTestProps> = ({
  initialValues,
  onValueChange,
}) => {
  const [files, setFiles] = useState<File[] | null>(null);

  const handleFileChange = (newFiles: File[] | null) => {
    setFiles(newFiles);
    if (newFiles === null) {
      onValueChange(null);
      return;
    }
    onValueChange(newFiles.length > 0 ? newFiles : null);
  };

  const dropZoneConfig = {
    maxFiles: 2,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };

  return (
    <FileUploader
      value={files}
      onValueChange={handleFileChange}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2 border-2 border-gray-200"
    >
      <FileInput
        className={
          !(files && files.length > 0)
            ? "outline-dashed outline-1 outline-white"
            : "outline-dashed outline-1 outline-white hidden"
        }
      >
        <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
          <FileSvgDraw />
        </div>
      </FileInput>
      <FileUploaderContent>
        {files &&
          files.length > 0 &&
          files.map((file, i) => (
            <FileUploaderItem key={i} index={i}>
              <span>{file.name}</span>
            </FileUploaderItem>
          ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploaderTest;
