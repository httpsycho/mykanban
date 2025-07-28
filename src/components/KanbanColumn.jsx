import TaskCard from './TaskCard';
import { useDroppable } from '@dnd-kit/core';
import { useTaskStore } from './taskStore';
import SortDropdown from './SortDropdown';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function KanbanColumn({
  id,
  title,
  tasks,
  showInput,
  shakingTasks,
  activeTaskId,
  activeColumnId,
  isDropForbidden,
  priorityWeight,
  triggerShake,
}) {
  const { t } = useTranslation();
  const {
    newTaskDescription,
    newTaskPriority,
    setNewTaskDescription,
    setNewTaskPriority,
    addTask,
  } = useTaskStore();

  const buttonIsDisabled = newTaskDescription.trim().length === 0;

  const { setNodeRef } = useDroppable({ id });

  const isActive = activeColumnId === id;
  const [sortMethod, setSortMethod] = useState(null);

  function handleAddTask() {
    if (!newTaskDescription.trim()) return;

    const newTask = {
      id: crypto.randomUUID(),
      description: newTaskDescription,
      date: new Date().toISOString(),
      priority: newTaskPriority,
      status: 'todo',
      isPinned: false,
    };

    addTask(newTask);

    const currentTasks = useTaskStore.getState().tasks;
    useTaskStore.getState().persistTasksToLocalStorage(currentTasks);

    setNewTaskDescription('');
    setNewTaskPriority('low');
  }

  const sortedTasks = [...tasks].filter((task) => task.id !== activeTaskId);

  sortedTasks.sort((a, b) => {
    if (b.isPinned !== a.isPinned) {
      return b.isPinned - a.isPinned;
    }

    if (sortMethod === 'priority-asc') {
      return priorityWeight[a.priority] - priorityWeight[b.priority];
    }
    if (sortMethod === 'priority-desc') {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    if (sortMethod === 'date-asc') {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortMethod === 'date-desc') {
      return new Date(b.date) - new Date(a.date);
    }

    return 0;
  });

  return (
    <div
      className={`kanban-column ${isActive ? 'is-over' : ''} ${isActive && isDropForbidden ? 'is-forbidden' : ''}`}
      ref={setNodeRef}
    >
      <div className="kanban-column__title-button">
        <h2 className="kanban-column__title">
          {title} <span className="task-count">({tasks.length})</span>
        </h2>
        <SortDropdown onChange={setSortMethod} />
      </div>
      {showInput && (
        <div className="task-form">
          <input
            type="text"
            className="task-form__input"
            placeholder={t('add_new_task')}
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />

          <select
            className="task-form__select"
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
          >
            <option className="task-form__option" value="low">
              {t('priority_low')}
            </option>
            <option className="task-form__option" value="medium">
              {t('priority_medium')}
            </option>
            <option className="task-form__option" value="high">
              {t('priority_high')}
            </option>
          </select>

          <button
            className={`task-form__button ${buttonIsDisabled ? 'disabled' : ''}`}
            disabled={buttonIsDisabled}
            onClick={handleAddTask}
          >
            {t('add_task')}
          </button>
        </div>
      )}

      <div className="kanban-column__tasks">
        {sortedTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isShaking={shakingTasks.includes(task.id)}
            isDragging={activeTaskId === task.id}
            triggerShake={triggerShake}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanColumn;
