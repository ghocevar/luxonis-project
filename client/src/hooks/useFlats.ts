import useSWR from 'swr';
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
    error,
  };
};
