import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./index.css";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <title>Dashboard</title>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
