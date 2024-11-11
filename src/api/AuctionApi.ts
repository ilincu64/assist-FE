import api, { fetcher } from "../config/api";
import { AxiosResponse } from "axios";

import { AuctionType } from "../types";

import useSWR from "swr";

const BASE_URL_AUCTIONS = "/auctions";
const BASE_URL_USERS = "/users";

export const AuctionApi = {
  searchAuction(value: string) {
    return api.get(`${BASE_URL_AUCTIONS}/search${value}`).then(
      ({
        data,
      }: AxiosResponse<{
        count: number;
        page: number;
        pageSize: number;
        auctions: AuctionType[];
      }>) => data,
    );
  },
  addToFavourites(id: number) {
    return api
      .post(`${BASE_URL_USERS}/favourites`, {
        id,
      })
      .then(({ data }: AxiosResponse<string>) => data);
  },
  deleteFromFavourites(id: number) {
    return api.delete(`${BASE_URL_USERS}/favourites/${id}`);
  },
  getFavourites(url: string) {
    return api.get(`${BASE_URL_USERS}${url}`).then(
      ({
        data,
      }: AxiosResponse<{
        count: number;
        page: number;
        pageSize: number;
        auctions: AuctionType[];
      }>) => data,
    );
  },

  createAuction(data: Object) {
    return api
      .post("/auctions", data)
      .then(({ data }: AxiosResponse<Object>) => data);
  },

  getAuctions(url: string) {
    return api.get(`${BASE_URL_AUCTIONS}${url}`).then(
      ({
        data,
      }: AxiosResponse<{
        count: number;
        page: number;
        pageSize: number;
        auctions: AuctionType[];
      }>) => data,
    );
  },
};

export function useAuctionById(id: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/auctions/search/${id}`,
    !id ? null : fetcher,
  );

  return { data, error, isLoading, mutate };
}
export function useAuctions(
  pageNr?: number,
  pageSize?: number,
  status?: string,
) {
  if (!pageNr) {
    pageNr = 1;
  } else if (!pageSize) {
    pageSize = 4;
  } else if (!status) {
    status = "";
  }
  const { data, error, isLoading, mutate } = useSWR(
    `/auctions/search?page=${pageNr}&page_size=${pageSize}&status=${status}`,
    fetcher,
  );

  return { data, error, isLoading, mutate };
}

export function useAuctionsByStatus(status: string) {
  const { data, error, isLoading, mutate } = useSWR(
    `/auctions/search?status=${status}`,
    fetcher,
  );

  return { data, error, isLoading, mutate };
}

export function usePortfolioAuctions(pageNr: number, pageSize: number) {
  const { data, error, isLoading, mutate } = useSWR(
    `/auctions/portofolio?page=${pageNr}&page_size=${pageSize}`,
    fetcher,
  );
  return { data, error, isLoading, mutate };
}
