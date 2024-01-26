export type InitialValuesT = {
  id?: number | null;
  title: string;
  body: string;
  userId: number | null;
};

export type ItemListPropsT = {
  items: Array<{ body: string; id: number; title: string; userId: number }>;
};
