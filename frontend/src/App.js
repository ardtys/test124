import React, { Suspense, lazy } from 'react';
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Lazy load pages for performance
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const CreateDocumentPage = lazy(() => import('./pages/CreateDocumentPage'));
const DocumentDetailsPage = lazy(() => import('./pages/DocumentDetailsPage'));
const DocumentListPage = lazy(() => import('./pages/DocumentListPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Loading Component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Protected Route Component with Enhanced Authentication
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  // Additional checks can be added here
  const isValidUser = isAuthenticated && user;

  return isValidUser ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

// Role-Based Access Control
const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user.role) ? (
    children
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/documents" 
              element={
                <ProtectedRoute>
                  <DocumentListPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/documents/create" 
              element={
                <RoleProtectedRoute allowedRoles={['admin', 'creator']}>
                  <CreateDocumentPage />
                </RoleProtectedRoute>
              } 
            />

            <Route 
              path="/documents/:id" 
              element={
                <ProtectedRoute>
                  <DocumentDetailsPage />
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />

            {/* Default Redirect */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />

            {/* 404 Not Found Route */}
            <Route 
              path="*" 
              element={
                <div className="flex justify-center items-center h-screen text-2xl">
                  404 - Page Not Found
                </div>
              } 
            />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;
