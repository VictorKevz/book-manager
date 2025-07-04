import {
  LockReset,
  RadioButtonChecked,
  RadioButtonUnchecked,
} from "@mui/icons-material";
import { SettingsTabProps } from "../../types/settings";

export const SettingsTab = ({
  data,
  selectedValue,
  title,
  description,
  onReset,
  onUpdate,
  activeTab,
}: SettingsTabProps) => {
  return (
    <div className="max-w-screen-lg w-full flex flex-col items-start gap-5 mt-6">
      <div className="flex flex-col items-start">
        <h2 className="text-xl">{title}</h2>
        <p>{description}</p>
      </div>
      <div className="w-full grid grid-cols-3 gap-5">
        {data.map((obj) => {
          const isActive = obj.value === selectedValue;
          return (
            <li key={obj.value}>
              <button
                type="button"
                onClick={() => onUpdate(obj.value)}
                className={`w-full border px-4 py-6  rounded-lg flex-col justify-between hover:bg-[var(--neutral-200)] ${
                  isActive
                    ? "border-[var(--secondary-color)] bg-[var(--neutral-300)]"
                    : "border-[var(--neutral-100)]"
                }`}
              >
                {activeTab === "language" && typeof obj.icon === "string" ? (
                  <span
                    style={{ backgroundImage: `url(${obj.icon})` }}
                    className="h-20 w-20 border border-[var(--neutral-100)] bg-cover rounded-xl mb-4"
                  ></span>
                ) : (
                  <span className="h-20 w-20 flex items-center justify-center my-5 text-[var(--neutral-700)] border border-[var(--neutral-100)] bg-[var(--neutral-400)] rounded-xl">
                    <obj.icon fontSize="large" />
                  </span>
                )}
                <h3 className="text-lg">{obj.label}</h3>
                <p className="text-sm mb-4">{obj.description}</p>

                {isActive ? (
                  <RadioButtonChecked className="text-[var(--primary-color)]" />
                ) : (
                  <RadioButtonUnchecked className="text-[var(--neutral-700)]" />
                )}
              </button>
            </li>
          );
        })}
      </div>
      <div className="w-full flex justify-end">
        <button
          type="button"
          onClick={onReset}
          className="h-12 w-fit px-4 border border-[var(--secondary-color)] rounded-xl gap-1 text-[var(--neutral-900)]"
        >
          <LockReset /> Reset Settings
        </button>
      </div>
    </div>
  );
};
