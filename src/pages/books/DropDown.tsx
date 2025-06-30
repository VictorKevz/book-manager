import { DropDownProps } from "../../types/search";

export const DropDown = ({ data, onSortUpdate, sortLabel }: DropDownProps) => {
  return (
    <ul className="absolute top-full right-0 mt-2 flex flex-col items-start gap-5 py-5 px-7 rounded-xl shadow-2xl bg-[var(--neutral-300)] border border-[var(--neutral-100)]">
      {data.map((option, i) => {
        const activeLabel = option.label === sortLabel;
        return (
          <li key={i}>
            <button
              type="button"
              onClick={() => onSortUpdate(option, option.label)}
              className={` text-sm ${
                activeLabel
                  ? "text-[var(--primary-color)]"
                  : "text-[var(--neutral-900)]"
              }`}
            >
              {option.label}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
