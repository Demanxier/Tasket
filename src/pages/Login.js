import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/usuario/login', { email, senha });
            if(response.data.token){
                onLoginSuccess();
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('id_usuario', response.data.usuario.id);
                navigate('/dashboard'); // Redireciona para o Dashboard
            }else{
                alert('Erro no login. Token não recebido.');
            }
            
        } catch (error) {
            console.log('Erro ao tentar logar', error);
            alert('Erro ao logar. Verifique suas credenciais.');          
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin}>
                <h2>Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    required
                />
                <button type="submit">Entrar</button>
            </form>
        </div>
    );
};

export default Login;