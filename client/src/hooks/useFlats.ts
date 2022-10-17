import useSWR, { Arguments } from 'swr';
import useSWRInfinite from 'swr/infinite';
import { IFlatsResponse } from '../interfaces/IFlat';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const url = 'http://localhost:3000/api/v1/flats';

export const useFlats = (page: number = 1) => {
  if (page < 1) {
    return {
      data: null,
      isLoading: false,
      error: new Error('Invalid page'),
    };
  }

  const take = 20;
  const { data, error } = useSWR<IFlatsResponse>(
    `${url}?take=${take}&skip=${(page - 1) * take}`,
    fetcher
  );

  return {
    data: data?.data,
    isLoading: !error && !data,
    error,
  };
};

const getKey = (
  pageIndex: number,
  previousPageData: IFlatsResponse
): Arguments => {
  const take = 20;

  if (previousPageData && previousPageData.data.flatsCount < pageIndex * take)
    return null;

  return `${url}?take=${take}&skip=${pageIndex * 20}`;
};

export const useFlatsInfinite = () => {
  const { data, error, size, setSize } = useSWRInfinite<IFlatsResponse>(
    getKey,
    fetcher
  );

  return {
    data: data?.map(d => d.data.flats).flat(),
    isLoading: !error && !data,
    error,
  };
};
