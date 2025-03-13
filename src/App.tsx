import { BrowserRouter } from "react-router-dom";
import Router from "./routes/routes";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
