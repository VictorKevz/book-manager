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
}: FormWraperProps) => {
  return (
    <form
      onSubmit={(event: FormEventType) => onSubmit(event)}
      className={`${maxWidth} w-full pb-6 shadow-xl rounded-2xl bg-[var(--neutral-200)] border border-[var(--neutral-100)]`}
    >
      <header className="w-full relative bg-[var(--neutral-400)] border-b p-5 border-[var(--neutral-100)] rounded-t-2xl">
        <h2 className="font-bold text-xl sm:text-2xl text-[var(--neutral-900)]">
          {title}
        </h2>
        <p className="text-[var(--neutral-700)] max-w-lg w-full">
          {description}
        </p>
        {toggleForm && (
          <button
            type="button"
            onClick={toggleForm}
            className="absolute right-4 top-4 h-10 w-10 bg-[var(--neutral-100)] rounded-full text-[var(--neutral-900)]"
          >
            <Close />
          </button>
        )}
      </header>
      {children}
    </form>
  );
};
