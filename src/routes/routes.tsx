import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainEventsPage from "../pages/home";

const Home = lazy(() => import("../pages/home"));
const Cooperation = lazy(() => import("../pages/cooperation"));
const Countries = lazy(() => import("../pages/countries"));

const Router: React.FC = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainEventsPage />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/cooperation" element={<Cooperation />} />
        <Route path='/cooperation/countries' element={<Countries/>}/>
      </Routes>
    </Suspense>
  );
};

export default Router;

