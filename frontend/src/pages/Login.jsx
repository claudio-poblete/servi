import { useState } from 'react';
import AuthContextModule from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login } = AuthContextModule.useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const isLoggedIn = login(email, password);

    if (isLoggedIn) {
      navigate('/dashboard'); // Redirige a la página de dashboard después de login exitoso
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Error de login */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
