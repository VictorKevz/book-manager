import { InputFieldProps, onChangeType } from "../../types/createBook";
import { FileUpload } from "./FileUpload";

export const InputField = ({
  field,
  onTextChange,
  onFileChange,
  previewUrl,
  onFileRemove,
}: InputFieldProps) => {
  const isFullWidth = field.type === "textarea" || field.type === "file";
  const isTitle = field.name === "title";
  return (
    <div
      className={`w-full ${isFullWidth ? "col-span-3" : ""} ${
        isTitle && "col-span-2"
      }`}
    >
      {field.type === "text" && (
        <label
          className={`w-full flex flex-col items-start gap-1.5 text-[var(--neutral-700)]`}
          htmlFor={field.name}
        >
          {field.label}
          <input
            type="text"
            name={field.name}
            value={typeof field.value === "string" ? field.value : ""}
            placeholder={field.placeholder}
            id={field.name}
            onChange={(event: onChangeType) => onTextChange(event)}
            className={`w-full h-12 border bg-[var(--neutral-50)] rounded-lg pl-5 ${
              !field.isValid
                ? "border-[var(--error)]"
                : "border-[var(--neutral-100)]"
            }`}
          />
          {!field.isValid && (
            <span className="text-xs pl-4 text-[var(--error)]">
              {field.errorMessage}
            </span>
          )}
        </label>
      )}

      {field.type === "textarea" && (
        <label
          htmlFor=""
          className="w-full flex flex-col items-start gap-2 text-[var(--neutral-700)]"
        >
          {field.label}
          <textarea
            rows={4}
            className={`w-full bg-[var(--neutral-50)] rounded-lg p-5 border ${
              !field.isValid
                ? "border-[var(--error)]"
                : "border-[var(--neutral-100)]"
            }`}
            placeholder={field.placeholder}
            value={typeof field.value === "string" ? field.value : ""}
            name={field.name}
            onChange={(event: onChangeType) => onTextChange(event)}
          />
          {!field.isValid && (
            <span className="text-xs pl-4 text-[var(--error)]">
              {field.errorMessage}
            </span>
          )}
        </label>
      )}

      {field.type === "file" && (
        <FileUpload
          field={field}
          onFileChange={onFileChange}
          onFileRemove={onFileRemove}
          previewUrl={previewUrl}
        />
      )}
    </div>
  );
};
