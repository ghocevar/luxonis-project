import axios from 'axios';

const perPage = 500;

export const baseUrl = 'https://www.sreality.cz/api/en/v2/estates';
export const apartmentsUrl = `${baseUrl}?category_main_cb=1&category_type_cb=1&no_auction=1&per_page=${perPage}&tms=1665834989288`;

export const getApartments = async () => {
  const { data } = await axios.get(apartmentsUrl);
  return data._embedded.estates;
};
