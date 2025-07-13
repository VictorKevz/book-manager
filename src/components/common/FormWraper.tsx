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
      className={`flex flex-col justify-between w-full shadow-xl bg-[var(--neutral-200)] border border-[var(--neutral-100)] overflow-y-scroll scrollbar-none rounded-2xl ${maxWidth} ${
        id === "bookEditor" && "h-full max-w-none lg:max-w-2xl rounded-none"
      } `}
    >
      <header
        className={`w-full flex items-start justify-between gap-6 bg-[var(--neutral-400)] border-b px-5 py-8 border-[var(--neutral-100)] ${
          id === "bookEditor" ? "rounded-t-0" : "rounded-t-2xl"
        }`}
      >
        <div className="w-[80%]">
          <h2 className="font-bold text-xl sm:text-3xl text-[var(--neutral-900)]">
            {title}
          </h2>
          <p className="text-[var(--neutral-700)] max-w-lg w-full">
            {description}
          </p>
        </div>
        {toggleForm && (
          <button
            type="button"
            onClick={toggleForm}
            className="min-h-8 min-w-8 w-10 h-10 justify-center bg-[var(--neutral-100)] rounded-full text-[var(--neutral-900)] hover:bg-[var(--error)]"
          >
            <Close />
          </button>
        )}
      </header>

      {children}
    </form>
  );
};
