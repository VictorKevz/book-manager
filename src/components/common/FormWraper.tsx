import { Close } from "@mui/icons-material";
import { FormWraperProps } from "../../types/loginRegister";
import { FormEventType } from "../../types/upsertBook";

export const FormWraper = ({
  children,
  onSubmit,
  title,
  description,
  toggleForm,
  maxWidth,
  id,
}: FormWraperProps) => {
  return (
    <form
      onSubmit={(event: FormEventType) => onSubmit(event)}
      className={`flex flex-col justify-between w-full shadow-xl bg-[var(--neutral-200)] border border-[var(--neutral-100)] overflow-auto rounded-2xl ${maxWidth} ${
        id === "bookEditor" && "min-h-dvh max-w-none lg:max-w-2xl rounded-none"
      } `}
    >
      <header
        className={`w-full relative bg-[var(--neutral-400)] border-b px-5 py-8 border-[var(--neutral-100)] ${
          id === "bookEditor" ? "rounded-t-0" : "rounded-t-2xl"
        }`}
      >
        <h2 className="font-bold text-xl sm:text-3xl text-[var(--neutral-900)]">
          {title}
        </h2>
        <p className="text-[var(--neutral-700)] max-w-lg w-full">
          {description}
        </p>
        {toggleForm && (
          <button
            type="button"
            onClick={toggleForm}
            className="absolute right-4 top-8 h-10 w-10 justify-center bg-[var(--neutral-100)] rounded-full text-[var(--neutral-900)] hover:bg-[var(--error)]"
          >
            <Close />
          </button>
        )}
      </header>

      {children}
    </form>
  );
};
