import { formItem, InputFieldType } from "./upsertBook";
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
