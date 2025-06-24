import { ReactNode } from "react";

export type BookItem = {
  title: string;
  author: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
  image_url: string | File;
};

export const EmptyBookItem: BookItem = {
  title: "",
  author: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
  image_url: "",
};
export const InitialValidItem: Record<keyof BookItem, boolean> = {
  title: true,
  author: true,
  category: true,
  description: true,
  price: true,
  quantity: true,
  image_url: true,
};
export type uiStateType = {
  isLoading: boolean;
  error: string;
};
export interface BookContextType {
  books: BookItem[];
  uiState: uiStateType;
}

export type ContextProviderProps = {
  children: ReactNode;
};
