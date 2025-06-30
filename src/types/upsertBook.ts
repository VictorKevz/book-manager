import { BookItem } from "./book";
export type InputFieldType = "text" | "password" | "textarea" | "file";
export type MUIIconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
export type formItem = {
  name: string;
  value: string | File;
  placeholder: string;
  type: InputFieldType;
  label: string;
  isValid: boolean;
  errorMessage: string;
  icon?: string | MUIIconType;
};
export type onChangeType = InputType | React.ChangeEvent<HTMLTextAreaElement>;
export type InputType = React.ChangeEvent<HTMLInputElement>;
export type FormEventType = React.FormEvent<HTMLFormElement>;
export type PreviewUrlType = string;

export type InputFieldProps = {
  field: formItem;
  onTextChange: (event: onChangeType) => void;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: PreviewUrlType;
  onFileRemove?: () => void;
};

export type FileUploadProps = {
  field: formItem;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: PreviewUrlType;
  onFileRemove: () => void;
};
// Type for database operations (with numbers for price and quantity)
export type BookItemForDB = Omit<BookItem, "price" | "quantity"> & {
  price: number;
  quantity: number;
};

// Type for creating new books (without id field)
export type CreateBookItem = Omit<BookItemForDB, "id">;
