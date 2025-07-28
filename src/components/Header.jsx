import UserMenu from './UserMenu';
import { useTranslation } from 'react-i18next';

function Header() {
  const toggleTheme = () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ru' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="kanban-board_header">
      <h1 className="app-logo">MyKanban</h1>
      <div className="user-info">
        <UserMenu />
        <button
          className="kanban-board_language"
          title={t('language_toggle')}
          onClick={toggleLanguage}
        ></button>
        <button
          className="kanban-board_theme"
          title={t('theme_toggle')}
          onClick={toggleTheme}
        ></button>
      </div>
    </div>
  );
}

export default Header;
