import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@src/pages/LoginPage";
import { MainLayout } from "@src/components/layout/MainLayout";
import { NewsPage } from "@src/pages/NewsPage";
import { ProfilePage } from "@src/pages/ProfilePage";
import { ResultsSelectionPage } from "@src/pages/ResultsSelectionPage";
import { Fragment } from "react";
import { AboutPage } from "./pages/AboutPage";
import { useAuth } from "./context/AuthContext";
import Loader from "./components/Loader";

function App() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/news" />} />
        <Route path="news" element={<NewsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        {isAuthenticated && (
          <Fragment>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="results" element={<ResultsSelectionPage />} />
          </Fragment>
        )}
      </Route>
    </Routes>
  );
}

export default App;
