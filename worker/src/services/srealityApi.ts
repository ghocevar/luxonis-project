import { selectFlatFields } from "../selectors/selectFlatFields";

const perPage = 500;

export const baseUrl = "https://www.sreality.cz/api/en/v2/estates";
export const flatsUrl = `${baseUrl}?category_main_cb=1&category_type_cb=1&no_auction=1&per_page=${perPage}&tms=1665834989288`;

export const getFlats = async () => {
	try {
		const res = await fetch(flatsUrl);
		const data = (await res.json()) as any;
		return data._embedded.estates.map((estate: any) =>
			selectFlatFields(estate)
		);
	} catch (error) {
		throw new Error(error);
	}
};
