import useSWR from 'swr';
import axios from 'axios';
import { IFlatsResponse } from '../interfaces/IFlat';

const fetcher = async (url: string) => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    // @ts-ignore
    throw new Error('Error: ', err);
  }
};

const take = 20;
const url = 'http://localhost:3000/api/v1/flats';

export const useFlats = (page: number = 1) => {
  const { data, error } = useSWR<IFlatsResponse>(
    `${url}?take=${take}&skip=${(page - 1) * take}`,
    fetcher
  );

  return {
    data: data?.data,
    error,
  };
};
