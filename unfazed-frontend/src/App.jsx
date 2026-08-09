import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Appointments from "./pages/Appointments";
import Payments from "./pages/Payments";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import SessionNotes from "./pages/SessionNotes";
import Notifications from "./pages/Notifications";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Clients />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/appointments"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Appointments />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Payments />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Analytics />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/session-notes"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SessionNotes />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Notifications />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;