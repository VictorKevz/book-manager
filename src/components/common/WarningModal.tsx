import { Close } from "@mui/icons-material";
export const WarningModal = () => {
  return (
    <div className="z-500 w-full min-h-screen fixed top-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px] transition-all duration-300 ease-in-out px-4">
      <dialog className="max-w-lg w-full flex flex-col justify-between bg-[var(--neutral-200)] py-5 rounded-xl shadow-xl border border-[var(--neutral-100)] mx-auto">
        <header className="w-full flex justify-between items-center gap-4 px-4 pb-4">
          <h2 className="font-bold text-lg text-[var(--neutral-700)]">
            Confirm to delete the selected book
          </h2>
          <button type="button">
            <Close />
          </button>
        </header>
        <div className="w-full border-b border-t py-5 border-[var(--neutral-100)] px-4">
          <p className="text-[var(--neutral-700)] text-base">
            Are you sure you want to delete the selected book?
            <br /> This action cannot be undone!
          </p>
        </div>
        <footer className="w-full flex items-center justify-between gap-4 mt-5 px-4">
          <button
            type="button"
            className="h-10 rounded-lg w-[50%] bg-[var(--neutral-400)] border border-[var(--neutral-100)]"
          >
            Cancel
          </button>
          <button
            type="button"
            className="h-10 rounded-lg w-[50%] bg-[var(--error)] "
          >
            Delete
          </button>
        </footer>
      </dialog>
    </div>
  );
};
