import { useCallback, useState } from "react";
import {
  RegisterField,
  RegisterItem,
  RegisterItemInitial,
  RegisterValid,
  RegisterValidInitial,
} from "../types/loginRegister";
import { InputField } from "../components/book-editor/InputField";
import { FormEventType, onChangeType } from "../types/upsertBook";
import { supabase } from "../hooks/useBookFetch";
import { useAlertProvider } from "../context/AlertContext";

export const RegisterPage = () => {
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
  const handleValidation = () => {
    const newRegisterValid: Record<keyof RegisterItem, boolean> = {
      ...registerValid,
    };

    Object.entries(register).forEach(([key, value]) => {
      const trimmedValue = value.trim();

      if (!trimmedValue || trimmedValue.length < 3) {
        newRegisterValid[key as keyof typeof newRegisterValid] = false;
        return;
      }

      if (key === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedValue)) {
          newRegisterValid[key as keyof typeof newRegisterValid] = false;
          return;
        }
      }

      if (key === "password") {
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-_*@#$%^&+=!]).{6,}$/;
        if (!passwordRegex.test(trimmedValue)) {
          newRegisterValid[key as keyof typeof newRegisterValid] = false;
          return;
        }
      }

      if (key === "confirmPassword") {
        if (register.password !== register.confirmPassword) {
          newRegisterValid[key as keyof typeof newRegisterValid] = false;
          return;
        }
      }
    });

    setRegisterValid(newRegisterValid);
    return Object.values(newRegisterValid).every(Boolean);
  };
  const handleSubmit = async (event: FormEventType) => {
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
  };

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
      errorMessage: "Your email is required",
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
    <section className="w-full min-h-dvh px-5 flex items-center justify-center bg-[var(--neutral-400)]">
      <form
        onSubmit={(event: FormEventType) => handleSubmit(event)}
        className="max-w-md w-full flex flex-col shadow-xl rounded-2xl bg-[var(--neutral-200)] border border-[var(--neutral-100)]"
      >
        <header className="w-full bg-[var(--neutral-300)] px-4 py-5 rounded-t-2xl">
          <h2 className="font-bold text-xl sm:text-2xl text-[var(--neutral-900)]">
            Create Your Account
          </h2>
        </header>
        <fieldset className="flex flex-col w-full gap-5 mt-5 px-4">
          {registerData.map((field) => (
            <InputField field={field} onTextChange={handleChange} />
          ))}
        </fieldset>
        <footer className="w-full my-6 px-4 flex flex-col items-center">
          <button
            type="submit"
            className={`h-10 w-full rounded-lg border border-transparent bg-[var(--primary-color)] text-white hover:text-[var(--neutral-900)] hover:bg-transparent hover:border-[var(--primary-color)]`}
          >
            Register
          </button>
          <p className="text-[var(--neutral-800)] text-xs mt-2">
            Already have an account? Login
          </p>
        </footer>
      </form>
    </section>
  );
};
