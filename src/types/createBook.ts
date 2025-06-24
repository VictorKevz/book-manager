export type formItem = {
  name: string;
  value: string | File;
  placeholder: string;
  type: "text" | "textarea" | "file";
  label: string;
  isValid: boolean;
  errorMessage: string;
};
export type onChangeType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export type PreviewUrlType = string | null;
export type InputFieldProps = {
  field: formItem;
  onTextChange: (event: onChangeType) => void;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: PreviewUrlType;
  onFileRemove: () => void;
};

export type FileUploadProps = {
  field: formItem;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl: PreviewUrlType;
  onFileRemove: () => void;
};
