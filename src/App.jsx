import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation, Routes, Route } from "react-router-dom";
import { useRef } from "react";

import Dashboard from "./components/dashboard/index.jsx";
import Services from "./components/dashboard/services.jsx";
import TransactionHistory from "./components/dashboard/transactionHistory.jsx";
import Support from "./components/dashboard/support.jsx";
import Settings from "./components/dashboard/setting.jsx";
import styles from "./pageTransition.module.css";

const App = () => {
  const location = useLocation();
  const nodeRef = useRef(null); // 👈 required for CSSTransition in React 18+

  return (
    <TransitionGroup component={null}>
      <CSSTransition
        key={location.pathname}
        classNames={{
          enter: styles.pageEnter,
          enterActive: styles.pageEnterActive,
          exit: styles.pageExit,
          exitActive: styles.pageExitActive,
        }}
        timeout={300}
        nodeRef={nodeRef} // 👈 provide ref
        unmountOnExit
      >
        <div ref={nodeRef} className={styles.pageWrapper}>
          <Routes location={location}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/services" element={<Services />} />
            <Route path="/transactions" element={<TransactionHistory />} />
            <Route path="/support" element={<Support />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default App;
