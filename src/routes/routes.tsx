import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "../components/layout";
import MainEventsPage from "../pages/home";

const Home = lazy(() => import("../pages/home"));
const About = lazy(() => import("../pages/about"));

const Router: React.FC = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainEventsPage />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;

