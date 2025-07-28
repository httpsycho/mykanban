import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from './authStore';
import { useTaskStore } from './taskStore';
import { useTranslation } from 'react-i18next';

function UserMenu() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const username = useAuthStore((state) => state.user?.username);
  const logout = useAuthStore((state) => state.logout);
  const resetBoard = useTaskStore((state) => state.resetBoard);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleReset = () => {
    const confirmReset = window.confirm(t('confirm_reset_board'));
    if (confirmReset) resetBoard();
  };

  return (
    <>
      {username && (
        <div className="user-menu" ref={menuRef}>
          <button
            className="user-menu__trigger"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="user-menu__name">{username}</span>
            <span className="user-menu__arrow">▼</span>
          </button>

          {isOpen && (
            <ul className="user-menu__dropdown">
              <li>
                <button onClick={handleReset}>{t('reset_board')}</button>
              </li>
              <li>
                <button onClick={logout}>{t('logout')}</button>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default UserMenu;
