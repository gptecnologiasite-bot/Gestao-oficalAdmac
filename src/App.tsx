import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { FinanceProvider } from './context/FinanceContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Finance from './pages/Finance'
import Teams from './pages/Teams'
import Members from './pages/Members'
import GroupCategories from './pages/GroupCategories'
import AssetCategories from './pages/AssetCategories'
import AssetLocations from './pages/AssetLocations'
import Admin from './pages/Admin'
import PrivateRoute from './components/PrivateRoute'
import Layout from './components/Layout'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <ToastProvider>
          <AuthProvider>
            <FinanceProvider>
              <Router>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <PrivateRoute>
                        <Layout />
                      </PrivateRoute>
                    }
                  >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="finance" element={<Finance />} />
                    <Route path="teams" element={<Teams />} />
                    <Route path="members" element={<Members />} />
                    <Route path="groups">
                      <Route path="categories" element={<GroupCategories />} />
                    </Route>
                    <Route path="assets">
                      <Route path="categories" element={<AssetCategories />} />
                      <Route path="locations" element={<AssetLocations />} />
                    </Route>
                    <Route path="admin" element={<Admin />} />
                  </Route>
                </Routes>
              </Router>
            </FinanceProvider>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App

