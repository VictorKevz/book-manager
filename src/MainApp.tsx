import { Navigate, Route, Routes } from "react-router-dom";
import ThemeButton from "./components/ThemeButton";
import { useAuth } from "./context/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { WelcomePage } from "./pages/WelcomePage";

export const MainApp = () => {
  const { user } = useAuth();
  return (
    <main className="w-full bg-[var(--neutral-400)] min-h-screen flex flex-col items-center justify-center gap-4 relative">
      <ThemeButton />
      <Routes>
        <Route
          index
          element={user ? <Navigate to="/dashboard" /> : <WelcomePage />}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </main>
  );
};
