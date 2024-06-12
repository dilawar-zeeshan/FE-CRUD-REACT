import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./App.css";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignUpPage";
import ResetPasswordPage from "./components/ResetPage";
import Dashboard from "./components/Dashboard";
import Adminmgmt from "./components/adminmgmt";
import { store, persistor } from "./store/store";
import ResetDone from "./components/ResetDone";

function App() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = !!user;

  // Log the userType
  console.log("User Type:", user ? user.userType : "No user logged in");

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/signup"
                element={
                  isLoggedIn ? (
                    user && user.userType === "admin" ? (
                      <Navigate to="/admin" replace />
                    ) : (
                      <Navigate to="/dashboard" replace />
                    )
                  ) : (
                    <SignupPage />
                  )
                }
              />
              <Route
                path="/"
                element={
                  isLoggedIn ? (
                    user && user.userType === "admin" ? (
                      <Navigate to="/admin" replace />
                    ) : (
                      <Navigate to="/dashboard" replace />
                    )
                  ) : (
                    <LoginPage />
                  )
                }
              />
              {/* <Route
                path="/"
                element={
                  isLoggedIn ? (
                    user && user.userType === "admin" ? (
                      <Adminmgmt />
                    ) : (
                      <Dashboard />
                    )
                  ) : (
                    <LoginPage />
                  )
                }
              /> */}
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/reset-done" element={<ResetDone />} />
              <Route
                path="/dashboard"
                element={
                  isLoggedIn && user && user.userType !== "admin" ? (
                    <Dashboard />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
              <Route
                path="/admin"
                element={
                  isLoggedIn && user && user.userType === "admin" ? (
                    <Adminmgmt />
                  ) : (
                    <Navigate to="/" replace />
                  )
                }
              />
            </Routes>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
