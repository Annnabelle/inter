import { Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("../pages/home"));
const MainEventsPage = lazy(() => import("../pages/home") )
const CountriesInner = lazy(() => import("../pages/countriesInner"))
const Cooperation = lazy(() => import("../pages/cooperation"));
const Countries = lazy(() => import("../pages/countries"));
const InternationalOrganizations = lazy(() => import("../pages/internationalOrganizations"))
const InternationalNonGovernmentalOrganizations = lazy(() => import("../pages/internationalNonGovernmentalOrganizations"))
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
        <Route path="/cooperation/international-organizations" element={<InternationalOrganizations/>}/>
        <Route path='/cooperation/international-non-governmental-organizations' element={<InternationalNonGovernmentalOrganizations/>}/>
      </Routes>
    </Suspense>
  );
};

export default Router;

