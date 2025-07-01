import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { WelcomePage } from "./pages/WelcomePage";
import { BookPage } from "./pages/books/BookPage";
import { Overview } from "./pages/overview/OverviewPage";

export const MainApp = () => {
  const { user } = useAuth();
  return (
    <main className="w-full bg-[var(--neutral-400)] min-h-screen h-full flex flex-col items-center justify-center gap-4 relative">
      <Routes>
        <Route
          index
          element={user ? <Navigate to="/dashboard" /> : <WelcomePage />}
        />
        <Route
          path="/dashboard/*"
          element={user ? <Dashboard /> : <Navigate to="/" />}
        >
          <Route index element={<Overview />} />
          <Route path="books" element={<BookPage />} />
          {/* <Route path="categories" element={<CategoriesPage />} />
    <Route path="settings" element={<SettingsPage />} /> */}
        </Route>
      </Routes>
    </main>
  );
};
