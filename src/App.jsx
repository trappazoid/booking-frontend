import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Footer from './components/Footer';
import Home from './pages/Home';
import EventPage from './pages/EventPage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import AddEventWizard from './pages/AddEventWizard';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

// Protected route for admin
const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-zinc-950">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (!user || user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

function AppRoutes() {
    return (
        <>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/event/:id" element={<EventPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route
                        path="/add-event"
                        element={
                            <AdminRoute>
                                <AddEventWizard />
                            </AdminRoute>
                        }
                    />
                </Routes>
            </Layout>
            <Footer />
        </>
    );
}

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <AppRoutes />
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
