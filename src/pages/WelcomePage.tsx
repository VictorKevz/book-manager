import { useState, useCallback } from "react";
import { Register } from "../components/login-register/Register";
import { Login } from "../components/login-register/Login";

export const WelcomePage = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const toggleForm = useCallback(() => {
    setShowRegister((prev) => !prev);
  }, []);

  return (
    <section className="w-full min-h-dvh px-5 flex items-center justify-center bg-[var(--neutral-400)]">
      {showRegister ? (
        <Register onFormToggle={toggleForm} />
      ) : (
        <Login onFormToggle={toggleForm} />
      )}
    </section>
  );
};
