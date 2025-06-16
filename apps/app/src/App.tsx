import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AppLayout from "./components/layout/AppLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import Simulations from "./pages/simulations/Simulations";
import NewSimulation from "./pages/simulations/NewSimulation";
import Register from "./pages/students/NewStudent";
import StudentProfile from "./pages/students/Students";
import EditStudent from "./pages/students/EditStudent";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<StudentProfile />} />
        <Route path="students/edit" element={<EditStudent />} />
        <Route path="simulations" element={<Simulations />} />
        <Route path="simulations/new" element={<NewSimulation />} />
      </Route>
    </Routes>
  );
}

export default App;
