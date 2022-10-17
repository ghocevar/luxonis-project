export interface IFlat {
  id: number;
  title: string;
  image_url: string;
}

export interface IFlatsResponse {
  status: string;
  data: {
    flats: IFlat[];
    flatsCount: number;
  };
}
