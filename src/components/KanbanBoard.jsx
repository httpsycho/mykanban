import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from '@dnd-kit/core';
import { useTranslation } from 'react-i18next';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';
import DragOverlayCard from './DragOverlayCard';
import './KanbanBoard.css';
import { useTaskStore } from './taskStore';

function KanbanBoard() {
  const { t } = useTranslation();
  const tasks = useTaskStore((state) => state.tasks);
  const loadTasks = useTaskStore((state) => state.loadTasksFromLocalStorage);
  const moveTaskToColumn = useTaskStore((state) => state.moveTaskToColumn);

  const [activeTaskId, setActiveTaskId] = useState(null);
  const [shakingTasks, setShakingTasks] = useState([]);
  const [activeColumnId, setActiveColumnId] = useState(null);
  const [isDropForbidden, setIsDropForbidden] = useState(false);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 8 } }),
    useSensor(TouchSensor, { activationConstraint: { distance: 8 } })
  );

  function handleDragStart(event) {
    setActiveTaskId(event.active.id);
  }

  function handleDragOver(event) {
    const { over } = event;
    if (over) {
      const newColumnId = over.id;
      const task = tasks.find((t) => t.id === activeTaskId);
      const forbidden =
        newColumnId === 'done' &&
        task &&
        task.status !== 'in-progress' &&
        task.status !== newColumnId;

      setActiveColumnId(newColumnId);
      setIsDropForbidden(forbidden);
    }
  }

  function triggerShake(taskId) {
    setShakingTasks((prev) => [...prev, taskId]);
    setTimeout(() => {
      setShakingTasks((prev) => prev.filter((id) => id !== taskId));
    }, 500);
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    const taskId = active.id;
    const newStatus = over?.id;
    const task = tasks.find((t) => t.id === taskId);

    if (task.status === newStatus) {
      setActiveTaskId(null);
      setActiveColumnId(null);
      return;
    }

    const blockedMove = newStatus === 'done' && task.status !== 'in-progress';

    if (blockedMove) {
      setShakingTasks((prev) => [...prev, taskId]);
      setTimeout(() => {
        setShakingTasks((prev) => prev.filter((id) => id !== taskId));
      }, 500);
    } else {
      moveTaskToColumn(taskId, newStatus);
    }

    setTimeout(() => {
      setActiveTaskId(null);
      setActiveColumnId(null);
    }, 10);
  }

  const priorityWeight = {
    high: 3,
    medium: 2,
    low: 1,
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="kanban-board-wrapper">
        <div className="kanban-board">
          <KanbanColumn
            id="todo"
            title={t('column_todo')}
            tasks={tasks.filter((task) => task.status === 'todo')}
            shakingTasks={shakingTasks}
            showInput={true}
            activeTaskId={activeTaskId}
            activeColumnId={activeColumnId}
            isDropForbidden={isDropForbidden}
            priorityWeight={priorityWeight}
            triggerShake={triggerShake}
          />
          <KanbanColumn
            id="in-progress"
            title={t('column_in_progress')}
            tasks={tasks.filter((task) => task.status === 'in-progress')}
            shakingTasks={shakingTasks}
            activeTaskId={activeTaskId}
            activeColumnId={activeColumnId}
            isDropForbidden={isDropForbidden}
            priorityWeight={priorityWeight}
            triggerShake={triggerShake}
          />
          <KanbanColumn
            id="done"
            title={t('column_done')}
            tasks={tasks.filter((task) => task.status === 'done')}
            shakingTasks={shakingTasks}
            activeTaskId={activeTaskId}
            activeColumnId={activeColumnId}
            isDropForbidden={isDropForbidden}
            priorityWeight={priorityWeight}
            triggerShake={triggerShake}
          />
        </div>
      </div>

      <DragOverlay>
        {activeTaskId && (
          <DragOverlayCard task={tasks.find((t) => t.id === activeTaskId)} />
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default KanbanBoard;
