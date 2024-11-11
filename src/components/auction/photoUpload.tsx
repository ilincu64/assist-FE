import { useState } from "react";
import { DropzoneOptions } from "react-dropzone";
import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
} from "./upload";
import { Plus } from "lucide-react";

interface PhotoUploaderTestProps {
  initialValues: File[] | null;
  onValueChange: (files: File[] | null) => void;
  imageUrl?: string;
  isEditing?: boolean;
}

const FileUploadDropzone: React.FC<PhotoUploaderTestProps> = ({
  initialValues,
  onValueChange,
  isEditing,
  imageUrl,
}) => {
  const [files, setFiles] = useState<File[] | null>(initialValues);

  const dropzone = {
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    multiple: true,
    maxFiles: 1,
    maxSize: 1 * 1024 * 1024,
  } satisfies DropzoneOptions;

  const handleFileChange = (newFiles: File[] | null) => {
    setFiles(newFiles);
    if (newFiles === null) {
      onValueChange(null);

      return;
    }
    onValueChange(newFiles.length > 0 ? newFiles : null);
  };

  return (
    <FileUploader
      value={files}
      onValueChange={handleFileChange}
      dropzoneOptions={dropzone}
    >
      <FileInput>
        <div
          className={
            !(files && files.length > 0)
              ? "flex h-32 w-full items-center justify-center rounded-md border bg-background bg-gray-200"
              : "hidden"
          }
        >
          <Plus className="rounded-full bg-white text-gray-200" />
        </div>
      </FileInput>
      <FileUploaderContent className="flex flex-row items-center gap-2">
        {files?.map((file, i) => (
          <FileUploaderItem
            key={i}
            index={i}
            className="size-32 overflow-hidden rounded-md p-0"
            aria-roledescription={`file ${i + 1} containing ${file.name}`}
          >
            <img
              src={isEditing ? imageUrl : URL.createObjectURL(file)}
              alt={file.name}
              height={100}
              width={100}
              className="size-full p-0"
            />
          </FileUploaderItem>
        ))}
      </FileUploaderContent>
    </FileUploader>
  );
};

export default FileUploadDropzone;
