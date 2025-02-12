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
const CreateDocumentWizard = lazy(() => import('./components/CreateDocument/CreateDocumentWizard'));
const DocumentDetailsPage = lazy(() => import('./pages/DocumentDetailsPage'));
const DocumentListPage = lazy(() => import('./pages/DocumentListPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));

// Loading Component
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: window.location.pathname }} />
  );
};

// Role-Based Access Control
const RoleProtectedRoute = ({ children, allowedRoles = ['admin', 'creator'] }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return allowedRoles.includes(user?.role) ? (
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
            <Route path="/unauthorized" element={
              <div className="flex justify-center items-center h-screen">
                <h2 className="text-2xl text-red-500">Unauthorized Access</h2>
              </div>
            } />

            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />

            {/* Document Routes */}
            <Route 
              path="/documents" 
              element={
                <ProtectedRoute>
                  <DocumentListPage />
                </ProtectedRoute>
              } 
            />

            {/* Document Creation Routes */}
            <Route 
              path="/documents/create" 
              element={
                <ProtectedRoute>
                  <CreateDocumentPage />
                </ProtectedRoute>
              } 
            />

            {/* Document Wizard Route */}
            <Route 
              path="/documents/create/wizard" 
              element={
                <RoleProtectedRoute allowedRoles={['admin', 'creator']}>
                  <CreateDocumentWizard />
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

            {/* Default and 404 Routes */}
            <Route 
              path="/" 
              element={<Navigate to="/dashboard" replace />} 
            />

            <Route 
              path="*" 
              element={
                <div className="flex justify-center items-center h-screen">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
                    <p className="text-xl text-gray-600">Page Not Found</p>
                  </div>
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
