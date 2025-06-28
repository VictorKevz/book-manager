import { useCallback, useState } from "react";
import {
  LoginRegisterProps,
  RegisterField,
  RegisterItem,
  RegisterItemInitial,
  RegisterValid,
  RegisterValidInitial,
} from "../../types/loginRegister";
import { InputField } from "../book-editor/InputField";
import { FormEventType, onChangeType } from "../../types/upsertBook";
import { supabase } from "../../hooks/useBookFetch";
import { useAlertProvider } from "../../context/AlertContext";
import { FormWraper } from "../common/FormWraper";

export const Register = ({ onFormToggle }: LoginRegisterProps) => {
  const [register, setRegister] = useState<RegisterItem>(RegisterItemInitial);
  const [registerValid, setRegisterValid] =
    useState<RegisterValid>(RegisterValidInitial);
  const { onShowAlert } = useAlertProvider();

  const handleChange = useCallback((event: onChangeType) => {
    const { value, name } = event.target;
    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
    setRegisterValid((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleValidation = () => {
    // 1. Clone the validation state to be updated during checks
    const newRegisterValid: Record<keyof RegisterItem, boolean> = {
      ...registerValid,
    };

    Object.entries(register).forEach(([key, value]) => {
      const trimmedValue = value.trim();

      // 2. Mark field as invalid if it's empty or less than 3 characters
      if (!trimmedValue || trimmedValue.length < 3) {
        newRegisterValid[key as keyof typeof newRegisterValid] = false;
        return;
      }

      // 3. Email: Check basic format
      if (key === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedValue)) {
          newRegisterValid[key as keyof typeof newRegisterValid] = false;
          return;
        }

        // 4. Email: Ensure domain is @victokevz.com
        const domainRegex = /^[^\s@]+@victorkevz\.com$/;
        if (!domainRegex.test(register.email)) {
          newRegisterValid.email = false;
          return;
        }
      }

      // 5. Password: Validate strength (uppercase, lowercase, digit, special char, min 6 chars)
      if (key === "password") {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_*@#$%^&+=!]).{6,}$/;
        if (!passwordRegex.test(trimmedValue)) {
          newRegisterValid[key as keyof typeof newRegisterValid] = false;
          return;
        }
      }

      // 6. Confirm Password: Must exactly match password
      if (key === "confirmPassword") {
        if (register.password !== register.confirmPassword) {
          newRegisterValid[key as keyof typeof newRegisterValid] = false;
          return;
        }
      }
    });

    // 7. Update the validation state and return final boolean result
    setRegisterValid(newRegisterValid);
    return Object.values(newRegisterValid).every(Boolean);
  };
  const handleSubmit = useCallback(
    async (event: FormEventType) => {
      event.preventDefault();
      const isValid = handleValidation();
      if (!isValid) {
        onShowAlert({
          type: "error",
          visible: true,
          message: "Form Validation Failed",
        });
        return;
      }

      const { error } = await supabase.auth.signUp({
        email: register.email,
        password: register.password,
        options: {
          data: {
            full_name: register.fullName,
          },
        },
      });

      if (error) {
        onShowAlert({
          type: "error",
          visible: true,
          message: error.message,
        });
        return;
      }

      onShowAlert({
        type: "success",
        visible: true,
        message:
          "Account created successfully! Please check your email to confirm.",
      });

      clearForm();
    },
    [
      handleValidation,
      onShowAlert,
      register.email,
      register.fullName,
      register.password,
    ]
  );

  const clearForm = () => {
    setRegister(RegisterItemInitial);
    setRegisterValid(RegisterValidInitial);
  };
  const registerData: RegisterField[] = [
    {
      name: "fullName",
      value: register.fullName,
      placeholder: "Jane Doe",
      type: "text",
      isValid: registerValid.fullName,
      label: "Full Name",
      errorMessage: "Your name is required",
    },
    {
      name: "email",
      value: register.email,
      placeholder: "janedoe@example.com",
      type: "text",
      isValid: registerValid.email,
      label: "Email",
      errorMessage: "Email must be a valid @victokevz.com address",
    },
    {
      name: "password",
      value: register.password,
      placeholder: "",
      type: "password",
      isValid: registerValid.password,
      label: "Password",
      errorMessage: "A password is required",
    },
    {
      name: "confirmPassword",
      value: register.confirmPassword,
      placeholder: "",
      type: "password",
      isValid: registerValid.confirmPassword,
      label: "Confirm Password",
      errorMessage: "Please confirm password",
    },
  ];
  return (
    <FormWraper
      onSubmit={handleSubmit}
      title="Create Your Account"
      description="Easily create an account by filling all out all fields correctly"
      maxWidth="max-w-md"
    >
      <fieldset className="flex flex-col w-full gap-5 mt-5 px-4">
        {registerData.map((field) => (
          <InputField
            key={field.name}
            field={field}
            onTextChange={handleChange}
          />
        ))}
      </fieldset>
      <footer className="w-full my-6 px-4 flex flex-col items-center">
        <button
          type="submit"
          className={`h-10 w-full rounded-lg border border-transparent bg-[var(--primary-color)] text-white hover:text-[var(--neutral-900)] hover:bg-transparent hover:border-[var(--primary-color)]`}
        >
          Register
        </button>
        <button
          type="button"
          onClick={onFormToggle}
          className="text-[var(--neutral-800)] text-xs mt-2 gap-0.5"
        >
          Already have an account? <span className="text-blue-500">Login</span>
        </button>
      </footer>
    </FormWraper>
  );
};
