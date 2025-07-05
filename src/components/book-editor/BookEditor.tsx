import { BookFormItem, formItem } from "../../types/upsertBook";
import { useBookUpsertForm } from "../../hooks/useBookUpsertForm";
import { InputField } from "./InputField";
import { BookCardProps, BookItem } from "../../types/book";
import { useBookProvider } from "../../context/BookContext";
import { FormLoader } from "../common/Loaders";
import { FormWraper } from "../common/FormWraper";

export const BookEditor = ({ book }: BookCardProps) => {
  const { refreshBooks, toggleForm } = useBookProvider();

  // The book passed is of type BookItem so we need to convert to BookFormItem
  // Form doesn't need fields like "id, user_id" so we remove them
  const convertBookToForm = (book: BookItem): BookFormItem => ({
    title: book.title,
    author: book.author,
    category: book.category,
    description: book.description,
    price: String(book.price),
    quantity: String(book.quantity),
    image_url: book.image_url,
  });
  // A DB-based identifier is still needed to determine whether we are editing or not
  const bookId = book.id;
  // Call the hook here and pass the required arguments
  const bookToEdit = convertBookToForm(book);
  const {
    handleFileChange,
    handleTextChange,
    handleSubmit,
    clearForm,
    form,
    formValid,
    previewUrl,
    clearFileUploader,
    formUiState,
  } = useBookUpsertForm(bookToEdit, bookId, refreshBooks, toggleForm);

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
    <div className="w-full h-[calc(100vh)] flex items-center justify-center fixed top-0 bottom-0 bg-black/60 backdrop-blur-[5px] z-500 px-4 py-5">
      <FormWraper
        onSubmit={handleSubmit}
        title=" Create a new book"
        description=" Fill out the form below to add a new book to the inventory. All
 fields are required unless stated otherwise."
        toggleForm={toggleForm}
        maxWidth="max-w-2xl"
      >
        <fieldset className={`w-full grid grid-cols-3 gap-6 mt-4 px-5 z-10`}>
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
            className="max-w-30 w-full h-10 justify-center rounded-xl px-4 border border-[var(--primary-color)] text-[var(--neutral-900)]"
            onClick={clearForm}
          >
            Clear
          </button>
          <button
            type="submit"
            className="max-w-30 w-full h-10 justify-center rounded-xl px-4 bg-[var(--primary-color)] text-[var(--neutral-900)]"
          >
            Submit
          </button>
        </div>
      </FormWraper>
      {formUiState.isLoading && (
        <div className="absolute z-50 flex items-center justify-center bg-[var(--neutral-200)] rounded-full">
          <FormLoader />
        </div>
      )}
    </div>
  );
};
