import { HiMiniCloudArrowUp } from "react-icons/hi2";
import { Label } from "./label";
import { Input } from "./input";

export default function Fileupload() {
  return (
    <div className="p-4 cursor-pointer space-y-12">
      <Label
        htmlFor="picture"
        className="flex justify-center flex-col items-center text-sm font-normal cursor-pointer mt-2 w-[549px] h-[126px] rounded-lg border border-gray-900/25 px-6 py-10"
      >
        <div className="text-2xl bg-gray-200 w-min p-1 rounded-full border-8 border-gray-100 mb-2">
          <HiMiniCloudArrowUp />
        </div>
        <p className="text-center sm:text-left">
          <span className="font-onest relative cursor-pointer rounded-md bg-white font-semibold text-indigo-[background: #363F72;] focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
            Click to upload
          </span>{" "}
          or drag and drop
        </p>
        <p className="text-center sm:text-left">
          SVG, PNG, JPG or GIF (max. 800x400px)
        </p>
      </Label>
      <Input
        id="picture"
        type="file"
        accept="image/png, image/jpg, image/jpeg image/svg+xml image/gif"
        className="hidden"
      />
    </div>
  );
}
