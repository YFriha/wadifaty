import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import JobListPage from './pages/JobListPage';
import JobDetailPage from './pages/JobDetailPage';
import ApplyPage from './pages/ApplyPage';
import CandidateDashboard from './pages/CandidateDashboard';


function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-900">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/jobs" element={<JobListPage />} />
              <Route path="/jobs/:id" element={<JobDetailPage />} />

              {/* Protected Candidate Routes */}
              <Route 
                path="/apply/:id" 
                element={
                  <ProtectedRoute role="candidate">
                    <ApplyPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute role="candidate">
                    <CandidateDashboard />
                  </ProtectedRoute>
                } 
              />


            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
