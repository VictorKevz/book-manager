import { useState, useCallback } from "react";
import { Register } from "../components/login-register/Register";
import { Login } from "../components/login-register/Login";

export const WelcomePage = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);

  const toggleForm = useCallback(() => {
    setShowRegister((prev) => !prev);
  }, []);

  return (
    <section
      className="relative w-full min-h-dvh px-4 py-6 flex items-center justify-center bg-cover bg-no-repeat bg-center bg-[var(--neutral-400)]"
      style={{ backgroundImage: "var(--main-bg)" }}
    >
      <div className="z-10">
        {showRegister ? (
          <Register onFormToggle={toggleForm} />
        ) : (
          <Login onFormToggle={toggleForm} />
        )}
      </div>

      <div className="absolute top-0 left-0 bottom-0 w-full bg-black/20 backdrop-blur-[5px] z-1"></div>
    </section>
  );
};
