export type Product = {
  id: string;
  title: string;
  name: string;
  grade: string;
  realPrice: number;
  priceWithoutSale: number;
  image: string;
  icon: string;
  sale: number;
};

export type SearchProductParams = {
  order: string;
  sortBy: string;
  category: string;
  search: string;
  currentPage: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface ProductSliceState {
  data: {
    items: Product[];
    pagination: {
      count: number;
    };
  };
  status: Status;
}
