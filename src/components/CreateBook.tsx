import { formItem, InputFieldProps, onChangeType } from "../types/createBook";
import { useBookForm } from "../hooks/useBookForm";
import { FileUpload } from "./FileUpload";

export const CreateBook = () => {
  const {
    handleFileChange,
    handleTextChange,
    handleSubmit,
    clearForm,
    form,
    formValid,
    previewUrl,
    clearFileUploader,
  } = useBookForm();
  const formData: formItem[] = [
    {
      name: "title",
      value: form.title,
      placeholder: "The Silent Patient",
      type: "text",
      isValid: formValid.title,
      label: "Title",
      errorMessage: "Title is required",
    },
    {
      name: "author",
      value: form.author,
      placeholder: "Alex Michaelides",
      type: "text",
      isValid: formValid.author,
      label: "Author",
      errorMessage: "Author name is required",
    },
    {
      name: "category",
      value: form.category,
      placeholder: "Psychological Thriller",
      type: "text",
      isValid: formValid.category,
      label: "Category",
      errorMessage: "Category is required",
    },
    {
      name: "price",
      value: form.price,
      placeholder: "14.99",
      type: "text",
      isValid: formValid.price,
      label: "Price",
      errorMessage: "Price must be a valid number",
    },
    {
      name: "quantity",
      value: form.quantity,
      placeholder: "120",
      type: "text",
      isValid: formValid.quantity,
      label: "Quantity",
      errorMessage: "Quantity is required",
    },
    {
      name: "description",
      value: form.description,
      placeholder:
        "A gripping tale of a woman's act of violence against her husband—and of the therapist obsessed with uncovering her motive.",
      type: "textarea",
      isValid: formValid.description,
      label: "Description",
      errorMessage: "Description is required",
    },
    {
      name: "image_url",
      value: form.image_url,
      placeholder: "Upload cover image",
      type: "file",
      isValid: formValid.image_url,
      label: "Cover Image",
      errorMessage: "Cover image is required",
    },
  ];
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl w-full my-6 shadow-xl rounded-2xl bg-[var(--neutral-200)] border border-[var(--neutral-100)]"
    >
      <header className="w-full bg-[var(--neutral-400)] border-b p-5 border-[var(--neutral-100)] rounded-t-2xl">
        <h2 className="text-3xl font-bold text-[var(--neutral-900)]">
          Create a new book
        </h2>
        <p className="text-[var(--neutral-700)] max-w-xl w-full">
          Fill out the form below to add a new book to the inventory. All fields
          are required unless stated otherwise.
        </p>
      </header>
      <fieldset className={`w-full grid grid-cols-3 gap-6 mt-4 px-5`}>
        {formData.map((field) => (
          <InputField
            key={field.name}
            field={field}
            onTextChange={handleTextChange}
            onFileChange={handleFileChange}
            previewUrl={previewUrl}
            onFileRemove={clearFileUploader}
          />
        ))}
      </fieldset>
      <div className="w-full flex items-center justify-between gap-6 mt-4 bg-[var(--neutral-400)] border-t p-5 border-[var(--neutral-100)] rounded-b-2xl">
        <button
          type="button"
          className="h-10 rounded-full px-4 border border-[var(--primary-color)]"
          onClick={clearForm}
        >
          Clear
        </button>
        <button
          type="submit"
          className="h-10 rounded-full px-4 bg-[var(--primary-color)] text-white"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

const InputField = ({
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
