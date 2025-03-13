import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/layout";

const Home = lazy(() => import("../pages/home"));
const About = lazy(() => import("../pages/about"));

const Router: React.FC = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;

