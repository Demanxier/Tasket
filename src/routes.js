import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

// Importação das páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Atendimentos from './pages/Atendimentos';
import Tarefas from './pages/Tarefas';
import Chamados from './pages/Chamados';

const ProtectedRoute = ({ isAuthenticated, children }) => {
    return isAuthenticated ? children : <Navigate to="/" />;
};

const AppRoutes = ({ isAuthenticated, onLoginSuccess }) => (
    <Routes>
        {/* Página de login */}
        <Route path="/" element={<Login onLoginSuccess={onLoginSuccess} />} />

        {/* Rotas protegidas */}
        <Route
            path="/dashboard"
            element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Dashboard />
                </ProtectedRoute>
            }
        />
        <Route
            path="/atendimentos"
            element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Atendimentos />
                </ProtectedRoute>
            }
        />

        <Route 
            path='/tarefa'
            element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Tarefas />
                </ProtectedRoute>
            }
        />

        <Route 
            path='/chamados'
            element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Chamados />
                </ProtectedRoute>
            }
        />      

        {/* Redirecionamento para rota inexistente */}
        <Route path="*" element={<Navigate to="/" />} />
    </Routes>
);

export default AppRoutes;