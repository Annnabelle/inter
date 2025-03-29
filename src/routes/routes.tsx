import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainEventsPage from "../pages/home";
import CountriesInner from "../pages/countriesInner";
import CooperationCountriesEvents from "../pages/countries/events";
import CooperationCountriesVisits from "../pages/countries/visits";
import CooperationCountriesDocuments from "../pages/countries/documents";

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
        <Route path='/cooperation/countries/:id' element={<CountriesInner/>}/>
        <Route path="/cooperation/countries/:id/events/:id" element={<CooperationCountriesEvents/>}/>
        <Route path="/cooperation/countries/:id/visits/:id" element={<CooperationCountriesVisits/>}/>
        <Route path="/cooperation/countries/:id/documents/:id" element={<CooperationCountriesDocuments/>}/>
      </Routes>
    </Suspense>
  );
};

export default Router;

