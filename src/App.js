import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Importar NavBar e arquivo de rotas
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import AppRoutes from './routes';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            {/* Renderiza a NavBar apenas se autenticado */}
            {isAuthenticated && <NavBar />}
            <div className="container mt-4">
                {/* Rotas do aplicativo */}
                <AppRoutes
                    isAuthenticated={isAuthenticated}
                    onLoginSuccess={() => setIsAuthenticated(true)}
                />
            </div>
            {/* Footer Fixo */}
            <Footer />
        </Router>
    );
};

export default App;