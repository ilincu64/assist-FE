import React from "react";
import { Button } from "../ui/button";
import { CircleCheckBig, Trash2, X } from "lucide-react";
import { Textarea } from "../ui/textarea";

interface ModalComponentProps {
  isOpen: boolean;
  onClose?: () => void;
  onDelete?: (e: any) => void;
  onConfirm?: (e: any) => void;
  onReject?: (e: any) => void;
  isDelete?: boolean;
  isReject?: boolean;
  isConfirm?: boolean;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  onDelete,
  onConfirm,
  onReject,
  isDelete,
  isReject,
  isConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 font-onest">
      <div className="w-11/12 rounded-lg bg-white p-4 shadow-lg sm:w-1/2 sm:p-6 md:w-1/3 md:p-8 lg:w-1/4">
        {isDelete ? (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <Trash2 className="h-10 w-10 rounded-full bg-red-200 p-2 text-red-600" />
            </div>
            <h2 className="mb-4 pt-4 text-start text-xl font-semibold">
              Delete Auction
            </h2>
            <p className="mb-4 text-start">
              Are you sure you want to delete it? This action is not reversible
              and your listing will disappear from all lists.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={onDelete}
                className="w-full text-white sm:w-auto"
              >
                Delete
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
        {isConfirm ? (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <CircleCheckBig className="h-10 w-10 rounded-full bg-green-200 p-2 text-green-600" />
            </div>
            <h2 className="mb-4 pt-4 text-start text-xl font-semibold">
              Auction accepted
            </h2>
            <p className="mb-4 text-start">
              This auction has been published. Author will be able to edit this
              post and republish changes.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={onConfirm}
                className="w-full text-white sm:w-auto"
              >
                Confirm
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
        {isReject ? (
          <>
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
              <X className="h-10 w-10 rounded-full bg-red-200 p-2 text-red-600" />
            </div>
            <h2 className="mb-4 pt-4 text-start text-xl font-semibold">
              Auction rejected
            </h2>
            <p className="mb-4 text-start">
              Please enter a reason for rejecting this auction.
            </p>
            <Textarea
              placeholder="Enter a description..."
              id="message-2"
              required
              className="h-full"
            />
            <div className="grid grid-cols-1 gap-4 pt-8 sm:grid-cols-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={onReject}
                className="w-full text-white sm:w-auto"
              >
                Confirm
              </Button>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ModalComponent;
