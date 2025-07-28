import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

function SortDropdown({ onChange }) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { label: t('sort_priority_desc'), value: 'priority-desc' },
    { label: t('sort_priority_asc'), value: 'priority-asc' },
    { label: t('sort_date_newest'), value: 'date-desc' },
    { label: t('sort_date_oldest'), value: 'date-asc' },
  ];
  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="sort-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sort-button"
      ></button>

      {isOpen && (
        <ul className="sort-menu">
          {sortOptions.map((option) => (
            <li key={option.value} onClick={() => handleSelect(option.value)}>
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SortDropdown;
