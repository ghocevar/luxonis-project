export const selectFields = estate => {
  return { title: estate.name, image_url: estate._links.image_middle2[0].href };
};
