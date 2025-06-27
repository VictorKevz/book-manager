import { Close } from "@mui/icons-material";
import { useBookProvider } from "../context/BookContext";
import { AnimatePresence } from "framer-motion";
import { BookMeta, uiStateType } from "../types/book";
import { FormLoader } from "./common/Loaders";
type Modalprops = {
  onModalClose: () => void;
  onBookDelete: () => void;
  bookToDelete: BookMeta;
  uiState: uiStateType;
};
export const WarningDialog = ({
  onModalClose,
  onBookDelete,
  bookToDelete,
  uiState,
}: Modalprops) => {
  return (
    <div className="z-500 w-full min-h-screen fixed top-0 flex items-center justify-center bg-black/60 backdrop-blur-[5px] transition-all duration-300 ease-in-out px-4">
      <dialog className="max-w-lg w-full flex flex-col justify-between bg-[var(--neutral-200)] py-5 rounded-xl shadow-2xl border border-[var(--neutral-100)] mx-auto">
        <header className="w-full flex justify-between items-start gap-4 px-4 pb-4">
          <h2 className="font-bold text-lg text-[var(--neutral-700)]">
            Confirm to delete book titiled: {bookToDelete.title}!
          </h2>
          <button
            type="button"
            onClick={onModalClose}
            className="rounded-lg border border-[var(--neutral-100)] w-8 h-8 text-[var(--neutral-800)]"
          >
            <Close />
          </button>
        </header>
        <div className="w-full border-b border-t py-5 border-[var(--neutral-100)] bg-[var(--neutral-400)] px-4">
          <p className="text-[var(--neutral-700)] text-base">
            Are you sure you want to delete the selected book?
            <br /> This action cannot be undone!
          </p>
        </div>
        <footer className="w-full flex items-center justify-between gap-4 mt-5 px-4">
          <button
            type="button"
            onClick={onModalClose}
            className="h-10 rounded-lg w-[50%] text-[var(--neutral-900)] bg-[var(--neutral-200)] border border-[var(--neutral-100)]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onBookDelete}
            className="h-10 rounded-lg w-[50%] bg-[var(--error)] "
          >
            Delete
          </button>
        </footer>

        {uiState.isLoading && (
          <div className="absolute z-50 flex items-center justify-center bg-[var(--neutral-200)] rounded-full">
            <FormLoader />
          </div>
        )}
      </dialog>
    </div>
  );
};

export const DialogWrapper = () => {
  const { isWarningModal, onModalClose, onBookDelete, bookToDelete, uiState } =
    useBookProvider();
  return (
    <AnimatePresence mode="wait">
      {isWarningModal && (
        <WarningDialog
          onModalClose={onModalClose}
          onBookDelete={onBookDelete}
          bookToDelete={bookToDelete}
          uiState={uiState}
        />
      )}
    </AnimatePresence>
  );
};
