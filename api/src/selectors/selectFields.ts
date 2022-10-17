import { UnsavedFlat } from '../types';

export const selectFields = (estate: any): UnsavedFlat => ({
  title: estate.name,
  image_url: estate._links.image_middle2[0].href,
});
