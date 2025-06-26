import { ReactNode } from "react";

export type BookItem = {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
  image_url: string | File;
};

export const EmptyBookItem: BookItem = {
  id: "",
  title: "",
  author: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
  image_url: "",
};
type BookFormKeys = Exclude<keyof BookItem, "id">;

export const InitialValidItem: Record<BookFormKeys, boolean> = {
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
  bookToEdit: BookItem;
  isFormOpen: boolean;
  onFormEdit: (book: BookItem) => void;
  onBookDelete: () => void;
  onModalOpen: (id: string) => void;
  onModalClose: () => void;
  toggleForm: () => void;
  uiState: uiStateType;
  refreshBooks: () => void;
  isWarningModal: boolean;
}

export type ContextProviderProps = {
  children: ReactNode;
};

export type BookCardProps = {
  book: BookItem;
};
