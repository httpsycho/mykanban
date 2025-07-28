import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function DragOverlayCard({ task }) {
  function formatTaskDate(dateString) {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }
  const { t } = useTranslation();
  return (
    <div className="task-card .task-card-overlay">
      <div className="task-card__header">
        <span
          className={`task-card__priority task-card__priority--${task.priority}`}
        >
          {t(`priority_${task.priority}`)}
        </span>

        <div className="task-card__buttons">
          <button
            className="task-card__button trash"
            alt="Удалить задачу"
          ></button>
          <button
            className={`task-card__button pin ${task.isPinned ? 'pinned' : ''}`}
            alt="Закрепить задачу"
          ></button>
          <button
            className="task-card__button edit"
            alt="Редактировать задачу"
          ></button>
        </div>
      </div>

      <p className="task-card__description">{task.description}</p>

      <div className="task-card__footer">
        <span className="task-card__date">{formatTaskDate(task.date)}</span>
        <button className="task-card__complete-button"></button>
      </div>
    </div>
  );
}

export default DragOverlayCard;
