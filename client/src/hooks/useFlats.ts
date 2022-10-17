import useSWR from 'swr';
import { IFlat, IFlatsResponse } from '../interfaces/IFlat';

const url = 'http://localhost:3000/api/v1/flats';
const fetcher = (url: string) => fetch(url).then(res => res.json());

const useFlats = () => {
  const { data, error } = useSWR<IFlatsResponse>(url, fetcher);

  return {
    data: data?.data,
    isLoading: !error && !data,
    error,
  };
};

export default useFlats;
