export enum SortPropertyEnum {
  PRICE_DESC = "realPrice",
  PRICE_ASC = "-realPrice",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
}
