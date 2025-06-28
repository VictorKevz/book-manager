import { ReactNode } from "react";
import { FormEventType, formItem, InputFieldType } from "./upsertBook";
export type RegisterField = Omit<formItem, "value" | "type"> & {
  value: string;
  type: InputFieldType;
};
export type RegisterItem = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
export const RegisterItemInitial = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export type RegisterValid = {
  [key in keyof RegisterItem]: boolean;
};
export const RegisterValidInitial: RegisterValid = {
  fullName: true,
  email: true,
  password: true,
  confirmPassword: true,
};

export type FormWraperProps = {
  children: ReactNode;
  onSubmit: (event: FormEventType) => void;
  title: string;
  description?: string;
  toggleForm?: () => void;
  maxWidth: "max-w-md" | "max-w-2xl";
};
