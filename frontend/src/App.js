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

// Simplified Protected Route Component
const ProtectedRoute = ({ children }) => {
  return children;
};

// Simplified Role-Based Access Control
const RoleProtectedRoute = ({ children }) => {
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
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
                <RoleProtectedRoute>
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
            {/* Default Route */}
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