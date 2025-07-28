import { useEffect } from 'react';
import { useAuthStore } from './components/authStore';
import KanbanBoard from './components/KanbanBoard';
import Login from './components/Login';
import Header from './components/Header';

function App() {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, []);
  return (
    <>
      <Header />
      <div>{user ? <KanbanBoard /> : <Login />}</div>
    </>
  );
}

export default App;
