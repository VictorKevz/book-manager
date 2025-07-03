import { useCallback, useState } from "react";
import { FormWraper } from "../common/FormWraper";
import { FormEventType, onChangeType } from "../../types/upsertBook";
import {
  LoginItem,
  LoginItemInitial,
  LoginRegisterProps,
  LoginValid,
  LoginValidInitial,
  RegisterField,
} from "../../types/loginRegister";
import { InputField } from "../book-editor/InputField";
import { useAlertProvider } from "../../context/AlertContext";
import { supabase } from "../../hooks/useBookFetch";

export const Login = ({ onFormToggle }: LoginRegisterProps) => {
  const [login, setLogin] = useState<LoginItem>(LoginItemInitial);
  const [loginValid, setLoginValid] = useState<LoginValid>(LoginValidInitial);
  const { onShowAlert } = useAlertProvider();

  const handleChange = useCallback((event: onChangeType) => {
    const { value, name } = event.target;
    setLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
    setLoginValid((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleValidation = () => {
    // 1. Clone the current validity state
    const newLoginValid: Record<keyof LoginItem, boolean> = { ...loginValid };

    Object.entries(login).forEach(([key, value]) => {
      const trimmedValue = value.trim();

      // 2. Mark field invalid if empty or too short
      if (!trimmedValue || trimmedValue.length < 3) {
        newLoginValid[key as keyof LoginItem] = false;
        return;
      }

      // 3. Email-specific validation
      if (key === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domainRegex = /^[^\s@]+@victorkevz\.com$/;

        if (!emailRegex.test(trimmedValue) || !domainRegex.test(trimmedValue)) {
          newLoginValid.email = false;
          return;
        }
      }
    });

    // 4. Finalize state and return overall validity
    setLoginValid(newLoginValid);
    return Object.values(newLoginValid).every(Boolean);
  };

  const handleSubmit = useCallback(
    async (e: FormEventType) => {
      e.preventDefault();

      // 1. If form is invalid show an alert and do nothing else
      const isValid = handleValidation();
      if (!isValid) {
        onShowAlert({
          type: "error",
          visible: true,
          message: "Form Validation Failed",
        });
        return;
      }

      //  2. Form is valid proceed to login using supabase SDK
      const { error, data } = await supabase.auth.signInWithPassword({
        email: login.email,
        password: login.password,
      });

      // 3. If there's a server-side error, show an alert and do nothing else.
      if (error) {
        console.error("Login Error:", error.message);
        onShowAlert({
          type: "error",
          visible: true,
          message: error.message,
        });
        return;
      }

      // 4.  Optional: Check email verification
      if (!data.user?.email_confirmed_at) {
        onShowAlert({
          type: "error",
          visible: true,
          message: "Please verify your email address before logging in.",
        });
        return;
      }

      // Success
      onShowAlert({
        type: "success",
        visible: true,
        message: "Login successful!",
      });
      setLogin(LoginItemInitial);
      setLoginValid(LoginValidInitial);
    },
    [handleValidation, login.email, login.password, onShowAlert]
  );

  const loginData: RegisterField[] = [
    {
      name: "email",
      value: login.email,
      placeholder: "janedoe@example.com",
      type: "text",
      isValid: loginValid.email,
      label: "Email",
      errorMessage: "Email must be a valid @victokevz.com address",
    },
    {
      name: "password",
      value: login.password,
      placeholder: "",
      type: "password",
      isValid: loginValid.password,
      label: "Password",
      errorMessage: "Please provide a correct password",
    },
  ];
  return (
    <section className="w-full min-h-dvh px-5 flex items-center justify-center bg-[var(--neutral-400)]">
      <FormWraper
        onSubmit={handleSubmit}
        title="Create Your Account"
        description="Easily create an account by filling all out all fields correctly"
        maxWidth="max-w-md"
      >
        <fieldset className="flex flex-col w-full gap-5 mt-5 px-4">
          {loginData.map((field) => (
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
            className={`h-10 w-full justify-center rounded-lg border border-transparent bg-[var(--primary-color)] text-white hover:text-[var(--neutral-900)] hover:bg-transparent hover:border-[var(--primary-color)]`}
          >
            Login
          </button>
          <button
            type="button"
            onClick={onFormToggle}
            className="text-[var(--neutral-800)] text-xs mt-2 gap-0.5"
          >
            Don't have an account?
            <span className="text-blue-500">Register</span>
          </button>
        </footer>
      </FormWraper>
    </section>
  );
};
