import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/layout/AppLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Simulations from "./pages/Simulations";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="simulations" element={<Simulations />} />
      </Route>
    </Routes>
  );
}

export default App;
