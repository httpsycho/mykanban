import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { useState, useEffect, useRef } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { useTaskStore } from './taskStore';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

function TaskCard({ task, isShaking, isDragging, triggerShake }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id: task.id,
      activationConstraint: {
        distance: 8,
      },
    });

  const deleteTask = useTaskStore((state) => state.deleteTask);
  const togglePinTask = useTaskStore((state) => state.togglePinTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [isEditing, setIsEditing] = useState(false);
  const [editDescription, setEditDescription] = useState('');
  const textareaRef = useRef(null);

  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const priorities = ['low', 'medium', 'high'];

  const priorityRef = useRef(null);
  function formatTaskDate(dateString) {
    return new Date(dateString).toLocaleDateString(i18n.language, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (priorityRef.current && !priorityRef.current.contains(e.target)) {
        setIsPriorityOpen(false);
      }
    }

    if (isPriorityOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPriorityOpen]);

  function handleSave() {
    updateTask(task.id, { description: editDescription });
    setIsEditing(false);
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    }
  }

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.setSelectionRange(
        textareaRef.current.value.length,
        textareaRef.current.value.length
      );
    }
  }, [isEditing]);

  const { t } = useTranslation();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: '100%',
    animation: isShaking ? 'shake 0.5s' : undefined,
    touchAction: 'none',
  };

  if (isDragging) return null;

  return (
    <div
      className="task-card"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
    >
      <div className="task-card__header">
        <div className="task-card__priority-wrapper" ref={priorityRef}>
          <button
            type="button"
            className={`task-card__priority task-card__priority--${task.priority}`}
            onClick={() => setIsPriorityOpen((prev) => !prev)}
          >
            {t(`priority_${task.priority}`)}
          </button>

          {isPriorityOpen && (
            <ul className="task-card__priority-dropdown">
              {priorities
                .filter((p) => p !== task.priority)
                .map((priority) => (
                  <li key={priority}>
                    <button
                      className={`task-card__priority-option task-card__priority--${priority}`}
                      onClick={() => {
                        updateTask(task.id, { priority });
                        setIsPriorityOpen(false);
                      }}
                    >
                      {t(`priority_${priority}`)}
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>

        <div className="task-card__buttons">
          <button
            className="task-card__button trash"
            title={t('delete_task')}
            onClick={(e) => {
              e.preventDefault();
              deleteTask(task.id);
            }}
          ></button>

          <button
            className={`task-card__button pin ${task.isPinned ? 'pinned' : ''}`}
            title={t('pin_task')}
            onClick={(e) => {
              e.preventDefault();
              togglePinTask(task.id);
            }}
          ></button>

          <button
            className="task-card__button edit"
            title={t('edit_task')}
            onClick={(e) => {
              e.preventDefault();
              setEditDescription(task.description);
              setIsEditing(true);
            }}
          ></button>
        </div>
      </div>

      {isEditing ? (
        <div className="task-card__edit-block">
          <TextareaAutosize
            ref={textareaRef}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            className="task-card__edit-input"
          />
          <button
            className="task-card__cancel-button"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsEditing(false);
              setEditDescription(task.description);
            }}
          >
            {t('cancel')}
          </button>
        </div>
      ) : (
        <p className="task-card__description">{task.description}</p>
      )}

      <div className="task-card__footer">
        <span className="task-card__date">{formatTaskDate(task.date)}</span>
        <button
          className="task-card__complete-button"
          title={t('mark_as_done')}
          onClick={(e) => {
            e.preventDefault();
            if (task.status === 'in-progress') {
              updateTask(task.id, { status: 'done' });
            } else {
              triggerShake(task.id);
            }
          }}
        ></button>
      </div>
    </div>
  );
}

export default TaskCard;
