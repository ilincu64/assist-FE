import React, { useState } from "react";
import {
  CreateAuctionSchema,
  CreateAuctionSchemaType,
} from "../../schemas/createAuctionSchema";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { AuctionForm } from "./auctionForm";
import { Description } from "./description";
import { ContactInfoForm } from "./contactInfoForm";
import { useAuctionById } from "../../api/AuctionApi";
import { useParams, useSearchParams } from "react-router-dom";

import FileUploaderTest from "./fileUpload";
import FileUploadDropzone from "./photoUpload";
import api, { BACKEND_API_URL } from "../../config/api";

interface AuctionProps {
  create: boolean;
}

export const ModifyAuction: React.FC<AuctionProps> = ({ create }) => {
  const { id } = useParams();
  const { data: editData } = useAuctionById(id as string);

  console.log(editData);

  const [formInfo, setFormtInfo] = useState<CreateAuctionSchemaType>({
    firstName: !create ? editData?.firstName || "" : "",
    lastName: !create ? editData?.lastName || "" : "",
    email: !create ? editData?.email || "" : "",
    title: !create ? editData?.title || "" : "",
    startingPrice: !create ? editData?.startingPrice.toString() || "" : "",
    thresholdPrice: !create ? editData?.thresholdPrice.toString() || "" : "",
    startTime: !create ? editData?.startTime || "" : "",
    endTime: !create ? editData?.endTime || "" : "",
    currency: !create ? editData?.currency || "USD" : "USD",
  });

  const [descriptionDetails, setDescriptionDetails] = useState({
    descriptionDetails: !create ? editData?.descriptionDetails || "" : "",
    checked: true,
  });

  const [uploadedFiles, setUploadedFiles] = useState<File[] | null>(null);
  const [uploadedPhoto1, setUploadedPhoto1] = useState<File[] | null>(null);
  const [uploadedPhoto2, setUploadedPhoto2] = useState<File[] | null>(null);
  const [uploadedPhoto3, setUploadedPhoto3] = useState<File[] | null>(null);
  const [uploadedPhoto4, setUploadedPhoto4] = useState<File[] | null>(null);

  const form = useForm<CreateAuctionSchemaType>({
    resolver: zodResolver(CreateAuctionSchema),
    defaultValues: formInfo,
  });

  const handleFileUploadChange = (files: File[] | null) => {
    setUploadedFiles(files);
  };

  const handlePhotoUploadChange1 = (files: File[] | null) => {
    setUploadedPhoto1(files);
  };

  const handlePhotoUploadChange2 = (files: File[] | null) => {
    setUploadedPhoto2(files);
  };

  const handlePhotoUploadChange3 = (files: File[] | null) => {
    setUploadedPhoto3(files);
  };

  const handlePhotoUploadChange4 = (files: File[] | null) => {
    setUploadedPhoto4(files);
  };

  const handleSubmit = async (data: CreateAuctionSchemaType) => {
    const formData = new FormData();

    // Collect all files
    const allFiles: File[] = [
      ...(uploadedFiles || []),
      ...(uploadedPhoto1 || []),
      ...(uploadedPhoto2 || []),
      ...(uploadedPhoto3 || []),
      ...(uploadedPhoto4 || []),
    ];
    allFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      let metadataResponse;
      // First request to submit metadata
      if (!create) {
        metadataResponse = await api.put(
          `${BACKEND_API_URL}/auctions/metadata/${id}`,
          {
            ...data,
            descriptionDetails: descriptionDetails.descriptionDetails,
            currency: data.currency === "" ? "USD" : data.currency,
          },
        );
      } else {
        metadataResponse = await api.post(
          `${BACKEND_API_URL}/auctions/metadata`,
          {
            ...data,
            descriptionDetails: descriptionDetails.descriptionDetails,
            currency: data.currency === "" ? "USD" : data.currency,
          },
        );
      }

      // Extract the response ID from the metadata response
      const responseId = metadataResponse?.data?.id;
      if (!responseId) {
        throw new Error("No response ID received from metadata submission");
      }

      // Add the response ID to the formData
      formData.append("auction_id", responseId);

      // Second request to submit files
      if (!create) {
        await api.put(`${BACKEND_API_URL}/auctions/files/${id}`, formData);
      } else {
        await api.post(`${BACKEND_API_URL}/auctions/files`, formData);
      }

      // Optional: handle successful submission, e.g., show a success message, clear form, etc.
      console.log("Auction created successfully");
    } catch (error) {
      // Handle errors
      console.error("Error creating auction:", error);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          id="auctionform"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col bg-slate-50 px-4 pb-4 font-onest sm:px-6"
        >
          <div className="flex w-full flex-col gap-4">
            <div className="flex flex-col items-start justify-center gap-6 py-8">
              {create ? (
                <>
                  <h1 className="text-3xl sm:text-6xl">Add an Auction</h1>
                </>
              ) : (
                <>
                  <h1 className="text-3xl sm:text-6xl">Edit Auction</h1>
                </>
              )}
              <p className="text-base sm:text-lg">
                Create, List and Manage Your Auction Items with Ease
              </p>
            </div>
            <div className="grid grid-cols-1 border-b-2 border-gray-200 py-8 sm:grid-cols-2">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-xl sm:text-2xl">Basic Information</h1>
                <p className="text-sm text-muted-foreground">
                  Be as thorough as you can.
                </p>
              </div>
              <AuctionForm form={form} />
            </div>
            <div className="grid grid-cols-1 border-b-2 border-gray-200 py-8 sm:grid-cols-2">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-xl sm:text-2xl">Photos & Documents</h1>
                <p className="text-sm text-muted-foreground">
                  Add up to 4 images and 2 documents.
                </p>
              </div>
              <div className="flex flex-col gap-8 rounded-lg border-b-2 border-gray-200 bg-white p-4 sm:p-8">
                <FileUploaderTest
                  initialValues={uploadedFiles}
                  onValueChange={handleFileUploadChange}
                />
                <div className="flex flex-wrap gap-4 sm:flex-nowrap sm:gap-8">
                  <FileUploadDropzone
                    isEditing={!create}
                    imageUrl={editData?.imageUrls[0]}
                    initialValues={uploadedPhoto1}
                    onValueChange={handlePhotoUploadChange1}
                  />
                  <FileUploadDropzone
                    isEditing={!create}
                    imageUrl={editData?.imageUrls[1]}
                    initialValues={uploadedPhoto2}
                    onValueChange={handlePhotoUploadChange2}
                  />
                  <FileUploadDropzone
                    isEditing={!create}
                    imageUrl={editData?.imageUrls[2]}
                    initialValues={uploadedPhoto3}
                    onValueChange={handlePhotoUploadChange3}
                  />
                  <FileUploadDropzone
                    isEditing={!create}
                    imageUrl={editData?.imageUrls[3]}
                    initialValues={uploadedPhoto4}
                    onValueChange={handlePhotoUploadChange4}
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 rounded-lg border-b-2 border-gray-200 py-8 sm:grid-cols-2">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-xl sm:text-2xl">Description</h1>
                <p className="text-sm text-muted-foreground">
                  Update your portfolio and bio.
                </p>
              </div>
              <div className="h-auto rounded-lg bg-white p-4 sm:h-96 sm:p-8">
                <Description
                  initialValues={descriptionDetails}
                  onChange={setDescriptionDetails}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 rounded-lg p-8 pb-32 sm:grid-cols-2">
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-xl sm:text-2xl">Contact Info</h1>
                <p className="text-sm text-muted-foreground">
                  Ways to be contacted.
                </p>
              </div>
              <div className="rounded-lg bg-white p-4 sm:p-8">
                <ContactInfoForm form={form} />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-end gap-4 bg-white px-4 sm:flex-row sm:gap-6 sm:p-6">
            <Button variant="outline" className="w-full sm:w-auto">
              Cancel
            </Button>
            {create ? (
              <Button
                type="submit"
                form="auctionform"
                className="w-full text-white sm:w-auto"
              >
                Save changes
              </Button>
            ) : (
              <Button
                type="submit"
                form="auctionform"
                className="w-full text-white sm:w-auto"
              >
                Edit Auction
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default ModifyAuction;
