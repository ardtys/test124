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

// Modified Protected Route Component - Always allows access
const ProtectedRoute = ({ children }) => {
  return children;
};

// Modified Role-Based Access Control - Always allows access
const RoleProtectedRoute = ({ children }) => {
  return children;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Removed login and register routes */}
            
            {/* Protected Routes - Now accessible without login */}
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* Document Routes */}
            <Route path="/documents" element={<DocumentListPage />} />
            <Route path="/documents/create" element={<CreateDocumentPage />} />
            <Route path="/documents/create/wizard" element={<CreateDocumentWizard />} />
            <Route path="/documents/:id" element={<DocumentDetailsPage />} />
            <Route path="/profile" element={<ProfilePage />} />

            {/* Default and 404 Routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
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