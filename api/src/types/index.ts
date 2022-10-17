export type Flat = {
  id: number;
  title: string;
  image_url: string;
};

export type UnsavedFlat = Omit<Flat, 'id'>;
