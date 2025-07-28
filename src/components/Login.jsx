import { useState } from 'react';
import { useAuthStore } from './authStore';
import { useTranslation } from 'react-i18next';

function Login() {
  const login = useAuthStore((state) => state.login);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);

    if (!success) {
      setError(t('invalid_credentials'));
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-container__title">{t('login_title')}</h2>
        <form onSubmit={handleSubmit}>
          <div className="login_input-block">
            <input
              className="input_login-password"
              type="text"
              placeholder={t('login')}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className="input_login-password"
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="login-button-wrapper">
            {error && <p className="login-error">{error}</p>}
            <button className="login-button">{t('login_button')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
