import { Button } from "../ui/button";

type Props = {
  isChanged?: boolean;
  onClose: () => void;
};

export default function FormOperations({ isChanged, onClose }: Props) {
  return (
    <div className="px-6 py-4 border-t w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <Button
        type="submit"
        variant="outline"
        className="sm:col-start-2 sm:col-end-3 md:col-start-3 md:col-end-4 border-primary text-primary"
        onClick={onClose}
        disabled={isChanged}
      >
        Cancel
      </Button>

      <Button type="submit" className="text-white" disabled={isChanged}>
        Save changes
      </Button>
    </div>
  );
}
