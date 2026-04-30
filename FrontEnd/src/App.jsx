import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Review from "./pages/Review";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-indigo-500/30">
      <Navbar />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Review />
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
