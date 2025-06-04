import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";
import SessionManager from "./utils/sessionManager";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <SessionManager />
      <Router />
    </BrowserRouter>
  );
};

export default App;
