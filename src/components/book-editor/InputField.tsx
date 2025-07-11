import { useState } from "react";
import { InputFieldProps, onChangeType } from "../../types/upsertBook";
import { FileUpload } from "./FileUpload";
import {
  Emergency,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { DropDown } from "../../pages/books/DropDown";
import { categoryData } from "../../data/searchData";

export const InputField = ({
  field,
  onTextChange,
  onFileChange,
  previewUrl,
  onFileRemove,
  onOptionUpdate,
  currentLabel,
  onToggleDropDown,
  dropDown,
  id,
}: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isFullWidth = field.type === "textarea" || field.type === "file";
  const isCategory = field.name === "category";
  const isInputTextField =
    !isCategory && (field.type === "text" || field.type === "password");
  const isTitle = field.name === "title";
  const isPassword = field.type === "password";

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
      className={`w-full ${isFullWidth && "sm:col-span-2"} ${
        id === "accountForm" && "lg:col-span-3"
      } ${isTitle && "sm:col-span-2"}`}
    >
      {isInputTextField && (
        <label
          className={`w-full flex flex-col items-start gap-1.5 text-[var(--neutral-700)]`}
          htmlFor={field.name}
        >
          <span className="text-[var(--neutral-800)] font-medium relative">
            {field.label}{" "}
            {field.errorMessage.trim() && (
              <Emergency
                fontSize="small"
                className="absolute top-0 -right-4 scale-40 text-red-500/90"
              />
            )}
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
          {isPassword && id !== "login" && (
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
      {isCategory && (
        <div className="relative flex flex-col items-start gap-2">
          <span className="text-[var(--neutral-800)] font-medium">
            {field.label}
          </span>
          <button
            type="button"
            onClick={onToggleDropDown}
            className="w-full justify-between h-11 border border-[var(--neutral-100)] bg-[var(--neutral-50)] rounded-lg px-5 text-[var(--neutral-900)]"
          >
            {currentLabel}
            {dropDown ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </button>
          {dropDown && (
            <DropDown
              data={categoryData.slice(1, categoryData.length)}
              onOptionUpdate={onOptionUpdate ?? (() => {})}
              currentLabel={currentLabel ?? ""}
            />
          )}
        </div>
      )}
      {field.type === "textarea" && (
        <label
          htmlFor={field.name}
          className="w-full flex flex-col items-start gap-2 text-[var(--neutral-700)]"
        >
          <span className=" relative text-[var(--neutral-800)] font-medium">
            {field.label}
            {field.errorMessage.trim() && (
              <Emergency
                fontSize="small"
                className="absolute -top-1 -right-4 scale-40 text-red-500/90"
              />
            )}
          </span>
          <textarea
            rows={3}
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
