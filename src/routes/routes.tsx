import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";



const Home = lazy(() => import("../pages/home"));
const MainEventsPage = lazy(() => import("../pages/home") )
const CountriesInner = lazy(() => import("../pages/countriesInner"))
const Cooperation = lazy(() => import("../pages/cooperation"));
const Countries = lazy(() => import("../pages/countries"));
const InternationalOrganizations = lazy(() => import("../pages/internationalOrganizations"))
const InternationalNonGovernmentalOrganizations = lazy(() => import("../pages/internationalNonGovernmentalOrganizations"))
const Experts = lazy(() => import("../pages/experts"))
const Translators = lazy(() => import("../pages/translators"))
const InternationalTreaties = lazy(() => import("../pages/internationalTreaties"))
const InternationalDocuments = lazy(()=> import('../pages/internationalDocuments'))
const Reports = lazy(() => import("../pages/reports"))
const Administration = lazy(() => import("../pages/administration"))
const EventStatistics = lazy(() => import("../pages/eventStatistics"))
const EventStatisticsInner = lazy(() => import( "../pages/eventStatisticsInner"))
const EventVisitsEmployee = lazy(() => import ("../pages/visits-employees"))
const StatisticsOfCountryVisits = lazy(() => import("../pages/statisticsOfCountryVisits") )
const LoginPage = lazy(() => import ("../pages/login"))
// const Organizations = lazy(() => import ("../pages/organizations"))
const InternationalOrganizationsMain = lazy(() => import ("../pages/internationalOrganizationsMain"))
const InternationalNonGovernmentalOrganizationsMain = lazy(() => import ("../pages/internationalNonGovernmentalOrganizationsMain"))
const Router: React.FC = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/main" element={<MainEventsPage />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/cooperation" element={<Cooperation />} />
        <Route path='/countries' element={<Countries/>}/>
        <Route path='/countries/:id' element={<CountriesInner/>}/>
        {/* <Route path='/organizations' element={<Organizations/>}/> */}
        <Route path='/international-organizations' element={<InternationalOrganizationsMain/>}/>
        <Route path='/international-non-governmental-organizations' element={<InternationalNonGovernmentalOrganizationsMain/>}/>
        <Route path="/international-organizations/:id" element={<InternationalOrganizations/>}/>
        <Route path='/international-non-governmental-organizations/:id' element={<InternationalNonGovernmentalOrganizations/>}/>
        <Route path='/experts' element={<Experts/>}/>
        <Route path='/translators' element={<Translators/>}/>
        <Route path='/international-treaties' element={<InternationalTreaties/>}/>
        <Route path="/international-documents" element={<InternationalDocuments/>}/>
        <Route path="/reports" element={<Reports/>}/>
        <Route path='/administrations' element={<Administration/>}/>
        <Route path='/event-statistics' element={<EventStatistics/>}/>
        <Route path='/visit-statistics-employee' element={<EventVisitsEmployee/>}/>
        <Route path='/event-statistics-inner' element={<EventStatisticsInner/>}/>
        <Route path='/statistics-of-country-visits' element={<StatisticsOfCountryVisits/>}/>
      </Routes>
    </Suspense>
  );
};

export default Router;

