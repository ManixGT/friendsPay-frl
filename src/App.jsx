import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation, Routes, Route } from "react-router-dom";
import Dashboard from "./components/dashboard/index.jsx";
import Services from "./components/dashboard/services.jsx";
import TransactionHistory from "./components/dashboard/transactionHistory.jsx";

const App = () => {
  const location = useLocation();

  return (
    <div className="app">
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="page" timeout={300}>
          <Routes location={location}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/tranHistory" element={<TransactionHistory />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default App;
