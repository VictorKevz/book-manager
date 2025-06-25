import { formItem } from "../../types/createBook";
import { useBookForm } from "../../hooks/useBookForm";
import { InputField } from "./InputField";
import { BookCardProps } from "../../types/book";
import { Close } from "@mui/icons-material";
import { useBookProvider } from "../../context/BookContext";

export const BookEditor = ({ book }: BookCardProps) => {
  const { refreshBooks, toggleForm } = useBookProvider();
  const {
    handleFileChange,
    handleTextChange,
    handleSubmit,
    clearForm,
    form,
    formValid,
    previewUrl,
    clearFileUploader,
  } = useBookForm(book, refreshBooks, toggleForm);

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
    <div className="w-full min-h-dvh flex items-center justify-center fixed top-0 bg-black/20 backdrop-blur-[2px]">
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl w-full my-6 shadow-xl rounded-2xl bg-[var(--neutral-200)] border border-[var(--neutral-100)]"
      >
        <header className="w-full relative bg-[var(--neutral-400)] border-b p-5 border-[var(--neutral-100)] rounded-t-2xl">
          <h2 className="text-3xl font-bold text-[var(--neutral-900)]">
            Create a new book
          </h2>
          <p className="text-[var(--neutral-700)] max-w-lg w-full">
            Fill out the form below to add a new book to the inventory. All
            fields are required unless stated otherwise.
          </p>
          <button
            type="button"
            onClick={toggleForm}
            className="absolute right-4 top-4 h-10 w-10 bg-[var(--neutral-100)] rounded-full text-[var(--neutral-900)]"
          >
            <Close />
          </button>
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
            className="max-w-30 w-full h-10 rounded-full px-4 border border-[var(--primary-color)] text-[var(--neutral-900)]"
            onClick={clearForm}
          >
            Clear
          </button>
          <button
            type="submit"
            className="max-w-30 w-full h-10 rounded-full px-4 bg-[var(--primary-color)] text-[var(--neutral-900)]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
