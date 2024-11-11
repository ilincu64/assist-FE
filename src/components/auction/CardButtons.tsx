import React, { useState } from "react";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "react-router-dom";
import ModalComponent from "../common/Modal";
import api, { BACKEND_API_URL } from "../../config/api";
import toast from "react-hot-toast";
import { useAuctionById } from "../../api/AuctionApi";
import { AxiosResponse } from "axios";

interface CardButtonsProps {
  status: string;
  email: string;
  id: number;
  owner: boolean;
  admin?: boolean;
}

const CardButtons = ({ status, email, id, owner, admin }: CardButtonsProps) => {
  const { mutate: mutateAuction } = useAuctionById(id.toString());
  const [deleteModal, setDeleteModal] = useState<boolean>(false);
  const [acceptAuction, setAcceptAuction] = useState<boolean>(false);
  const [reject, setReject] = useState<boolean>(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handlePlaceBid = (e: any) => {
    e.stopPropagation();
    navigate(`/auctions/${id}`, {
      state: {
        previous: pathname,
      },
    });
  };

  const handleDelete = (e: any) => {
    api
      .delete(`${BACKEND_API_URL}/auctions/${id}`)
      .then((res) => {
        if (res) {
          toast.success(res.data);
          mutateAuction();
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
    setDeleteModal(!deleteModal);
  };

  const onCloseDelete = () => {
    setDeleteModal(!deleteModal);
  };

  const handleAccept = (e: any) => {
    e.stopPropagation();
    const deletedAuction = {
      auctionId: id,
      approval: true,
      reason: "",
    };
    api
      .post(`${BACKEND_API_URL}/admin/proposals`, deletedAuction)
      .then(({ data }: AxiosResponse<Object>) => console.log(data));
    setAcceptAuction(!acceptAuction);
  };

  const onCloseAccept = () => {
    setAcceptAuction(!acceptAuction);
  };

  const handleReject = (e: any) => {
    e.stopPropagation();
    const rejectedAuction = {
      auctionId: id,
      approval: false,
      reason: "",
    };
    api
      .post(`${BACKEND_API_URL}/admin/proposals`, rejectedAuction)
      .then(({ data }: AxiosResponse<Object>) => console.log(data));
    setReject(!reject);
  };

  const onCloseReject = () => {
    setReject(!reject);
  };

  const ButtonsValue = () => {
    switch (status) {
      case "ONGOING":
        if (owner) {
          return <Button variant="outline">View auction</Button>;
        } else {
          return (
            <Button onClick={handlePlaceBid} variant="outline">
              Place bid
            </Button>
          );
        }
      case "PENDING":
        if (admin) {
          return (
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <Button
                variant="outline"
                onClick={(e: any) => {
                  handleAccept(e);
                }}
              >
                Accept
              </Button>
              <Button
                variant="outline"
                className="border-0 text-red-600"
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleReject(e);
                }}
              >
                Reject
              </Button>
            </div>
          );
        }
        if (owner) {
          return (
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <Button
                variant="outline"
                onClick={(e: any) => {
                  e.stopPropagation();
                  navigate(`/editAuction/${id}`);
                }}
              >
                Edit
              </Button>
              <Button
                className="bg-red-600 text-white"
                onClick={(e: any) => {
                  e.stopPropagation();
                  handleDelete(e);
                }}
              >
                Delete
              </Button>
            </div>
          );
        } else {
          return <></>;
        }
      case "REJECTED":
        if (owner) {
          return (
            <>
              <Button variant="outline">View reason</Button>
            </>
          );
        } else {
          return <></>;
        }
      default:
        return <p></p>;
    }
  };

  return (
    <div>
      {ButtonsValue()}
      <ModalComponent
        isDelete
        onDelete={handleDelete}
        onClose={onCloseDelete}
        isOpen={deleteModal}
      />
      <ModalComponent
        isConfirm
        onConfirm={handleAccept}
        onClose={onCloseAccept}
        isOpen={acceptAuction}
      />
      <ModalComponent
        isReject
        onReject={handleReject}
        onClose={onCloseReject}
        isOpen={reject}
      />
    </div>
  );
};

export default CardButtons;
