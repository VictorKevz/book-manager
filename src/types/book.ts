import { ReactNode } from "react";

export type BookItem = {
  id: string;
  user_id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  price: string;
  quantity: string;
  image_url: string | File;
  created_at: string;
  updated_at: string | null;
};

export const EmptyBookItem: BookItem = {
  id: "",
  user_id: "",
  title: "",
  author: "",
  category: "",
  description: "",
  price: "",
  quantity: "",
  image_url: "",
  created_at: "",
  updated_at: null,
};
type BookFormKeys = Exclude<
  keyof BookItem,
  "id" | "user_id" | "created_at" | "updated_at"
>;

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
  bookToDelete: BookMeta;
  onBookDelete: () => void;
  onModalOpen: (book: BookMeta) => void;
  onModalClose: () => void;
  toggleForm: () => void;
  uiState: uiStateType;
  refreshBooks: () => void;
  isWarningModal: boolean;
}

export type ContextProviderProps = {
  children: ReactNode;
};
export type BookMeta = Pick<BookItem, "id" | "title" | "image_url">;
export type BookCardProps = {
  book: BookItem;
};
