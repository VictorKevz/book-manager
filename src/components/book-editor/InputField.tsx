import { useState } from "react";
import { InputFieldProps, onChangeType } from "../../types/upsertBook";
import { FileUpload } from "./FileUpload";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export const InputField = ({
  field,
  onTextChange,
  onFileChange,
  previewUrl,
  onFileRemove,
}: InputFieldProps) => {
  const isFullWidth = field.type === "textarea" || field.type === "file";
  const isInputTextField = field.type === "text" || field.type === "password";
  const isTitle = field.name === "title";
  const isPassword = field.type === "password";
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputType = isPassword
    ? showPassword
      ? "text"
      : "password"
    : field.type;

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <div
      className={`w-full ${isFullWidth ? "col-span-3" : ""} ${
        isTitle && "col-span-2"
      }`}
    >
      {isInputTextField && (
        <label
          className={`w-full flex flex-col items-start gap-1.5 text-[var(--neutral-700)]`}
          htmlFor={field.name}
        >
          <span className="text-[var(--neutral-800)] font-medium">
            {field.label}
          </span>
          <div className="w-full relative flex items-center">
            <input
              type={inputType}
              name={field.name}
              value={typeof field.value === "string" ? field.value : ""}
              placeholder={field.placeholder}
              id={field.name}
              onChange={(event: onChangeType) => onTextChange(event)}
              className={`w-full h-11 border bg-[var(--neutral-50)] rounded-lg pl-5 text-[var(--neutral-900)] placeholder:text-[var(--neutral-700)] ${
                !field.isValid
                  ? "border-[var(--error)]"
                  : "border-[var(--neutral-100)]"
              }`}
            />
            {isPassword && (
              <button
                type="button"
                onClick={togglePassword}
                className="absolute right-0 h-12 bg-[var(--neutral-400)] px-2.5 rounded-r-lg"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            )}
          </div>
          {isPassword && (
            <span className="text-xs pt-1 text-[var(--neutral-800)]">
              Enter a password with at least 6 characters, including: a number,
              a lowercase letter, an uppercase letter, and a special character
              like <strong>@, #, -, _, or *.</strong>
            </span>
          )}
          {!field.isValid && (
            <span className="text-xs pl-4 text-[var(--error)]">
              {field.errorMessage}
            </span>
          )}
        </label>
      )}

      {field.type === "textarea" && (
        <label
          htmlFor={field.name}
          className="w-full flex flex-col items-start gap-2 text-[var(--neutral-700)]"
        >
          <span className="text-[var(--neutral-800)] font-medium">
            {field.label}
          </span>
          <textarea
            rows={2}
            id={field.name}
            className={`w-full bg-[var(--neutral-50)] rounded-lg p-5 border text-[var(--neutral-900)] placeholder:text-[var(--neutral-700)] ${
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
          onFileChange={onFileChange ?? (() => {})}
          onFileRemove={onFileRemove ?? (() => {})}
          previewUrl={previewUrl ?? ""}
        />
      )}
    </div>
  );
};
