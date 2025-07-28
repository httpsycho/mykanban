import { create } from 'zustand';
import axios from 'axios';

export const useTaskStore = create((set) => {
  const persistTasksToLocalStorage = (tasks) => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  };

  const wrappedSet = (fn) =>
    set((state) => {
      const nextState = fn(state);
      if ('tasks' in nextState) {
        persistTasksToLocalStorage(nextState.tasks);
      }
      return nextState;
    });

  return {
    tasks: [],

    setTasks: (newTasks) => wrappedSet(() => ({ tasks: newTasks })),

    addTask: (task) =>
      wrappedSet((state) => ({
        tasks: [...state.tasks, task],
      })),

    deleteTask: (id) =>
      wrappedSet((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      })),

    togglePinTask: (id) =>
      wrappedSet((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, isPinned: !task.isPinned } : task
        ),
      })),

    updateTask: (id, updatedFields) =>
      wrappedSet((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, ...updatedFields } : task
        ),
      })),

    moveTaskToColumn: (id, newStatus) =>
      wrappedSet((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === id ? { ...task, status: newStatus } : task
        ),
      })),

    newTaskDescription: '',
    newTaskPriority: 'low',

    setNewTaskDescription: (desc) => set({ newTaskDescription: desc }),
    setNewTaskPriority: (priority) => set({ newTaskPriority: priority }),

    loadTasksFromLocalStorage: () => {
      const saved = localStorage.getItem('kanban-tasks');
      if (saved) {
        set({ tasks: JSON.parse(saved) });
      } else {
        set({
          tasks: [],
        });
      }
    },
    resetBoard: () => {
      localStorage.removeItem('kanban-tasks');
      set({
        tasks: [],
      });
    },
    persistTasksToLocalStorage,

    // -------- DEMO API --------
    demoAddTaskToServer: async (taskData) => {
      try {
        const response = await axios.post(
          'https://jsonplaceholder.typicode.com/todos',
          {
            title: taskData.description,
            completed: false,
          }
        );
        console.log('Демо-отправка задачи на сервер:', response.data);
      } catch (error) {
        console.error('Ошибка при демо-отправке задачи:', error);
      }
    },

    demoDeleteTaskFromServer: async (taskId) => {
      try {
        const response = await axios.delete(
          `https://jsonplaceholder.typicode.com/todos/${taskId}`
        );
        console.log(`Демо-удаление задачи ID ${taskId}:`, response.data);
      } catch (error) {
        console.error('Ошибка при демо-удалении задачи:', error);
      }
    },
  };
});
