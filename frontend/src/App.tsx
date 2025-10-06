import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LoginPage } from "@src/pages/LoginPage";
import { MainLayout } from "@src/components/layout/MainLayout";
import { NewsPage } from "@src/pages/NewsPage";
import { ProfilePage } from "@src/pages/ProfilePage";
import { ResultsSelectionPage } from "@src/pages/ResultsSelectionPage";
import { Fragment, useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const formData = localStorage.getItem("token");

    setIsAuthenticated(!!formData);
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/news" />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="/login" element={<LoginPage />} />
          {isAuthenticated && (
            <Fragment>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="results" element={<ResultsSelectionPage />} />
            </Fragment>
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
