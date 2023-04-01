import { UnsavedFlat } from "../d1/schema";

export const selectFlatFields = (item: any): UnsavedFlat => {
	return (
		item.name &&
		item._links.image_middle2[0].href &&
		({
			title: item.name,
			imageUrl: item._links.image_middle2[0].href,
		} satisfies UnsavedFlat)
	);
};
