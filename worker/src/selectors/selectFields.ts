export const selectFields = (item: any) =>
	item.name &&
	item._links.image_middle2[0].href && {
		title: item.name,
		imageUrl: item._links.image_middle2[0].href,
	};
