import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
            <ul class="navbar-nav">
                <li class="nav-item active"><Link to="/dashboard">Dashboard</Link></li>
                <li class="nav-item"><Link to="/chamados">Chamado</Link></li>
                <li class="nav-item"><Link to="/atendimentos">Atendimento</Link></li>
                <li class="nav-item"><Link to="/tarefa">Tarefa</Link></li>
                <li class="nav-item"></li>
                <li class="nav-item">
                    <button class="btn btn-warning"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = '/';
                        }}>Sair</button></li>
            </ul>
        </nav>
    );
};

export default NavBar;