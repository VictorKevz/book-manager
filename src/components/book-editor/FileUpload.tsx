import React from "react";
import { Close } from "@mui/icons-material";
import { FileUploadProps } from "../../types/upsertBook";

export const FileUpload = ({
  field,
  onFileChange,
  onFileRemove,
  previewUrl,
}: FileUploadProps) => {
  return (
    <label className="w-full flex flex-col gap-2">
      <span className="text-sm text-[var(--neutral-800)] font-medium">
        Upload Book Cover
      </span>

      <div className="relative">
        <input
          type="file"
          name={field.name}
          id={field.name}
          accept=".jpg,.png,.jpeg"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onFileChange(event)
          }
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
        <button
          type="button"
          className={`w-full flex items-center h-14 border rounded-lg text-sm font-medium ${
            !field.isValid
              ? "border-[var(--error)]"
              : "border-[var(--neutral-100)]"
          }
            ${
              previewUrl
                ? "border-[var(--primary-color)] text-[var(--neutral-900)]"
                : "bg-[var(--neutral-50)] text-[var(--primary-color)]"
            }`}
        >
          Browse files (JPG, PNG)
          {previewUrl && (
            <span className="flex items-center gap-2 absolute right-3">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <span role="button" onClick={onFileRemove}>
                <Close fontSize="medium" className="text-[var(--error)]" />
              </span>
            </span>
          )}
        </button>
      </div>

      {!field.isValid && (
        <span className="text-xs text-[var(--error)] pl-4">
          {field.errorMessage}
        </span>
      )}
    </label>
  );
};
