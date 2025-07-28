import { useEffect } from 'react';
import axios from 'axios';
import { useTaskStore } from './taskStore';

function LoadInitialTasks() {
  function getRandomStatus() {
    const statuses = ['todo', 'in-progress', 'done'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  }

  function getRandomPriority() {
    const priorities = ['low', 'medium', 'high'];
    return priorities[Math.floor(Math.random() * priorities.length)];
  }

  const setTasks = useTaskStore((state) => state.setTasks);

  const titles = [
    'Сделать адаптивную вёрстку',
    'Подключить drag and drop',
    'Добавить анимацию загрузки',
    'Написать документацию',
    'Проверить на мобильных',
    'Добавить авторизацию',
    'Пофиксить баг с кнопкой',
    'Настроить ESLint и Prettier',
    'Разделить компоненты',
    'Обновить README.md',
    'Протестировать drag and drop',
    'Залить проект на GitHub',
    'Провести рефакторинг',
    'Сделать тёмную тему',
    'Добавить превью задач',
  ];

  (useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos')
      .then((response) => {
        const rawTodos = response.data.slice(0, 15);
        const mappedTasks = rawTodos.map((todo) => ({
          id: String(todo.id),
          description: titles[Math.floor(Math.random() * titles.length)],
          status: getRandomStatus(),
          priority: getRandomPriority(),
          date: new Date().toLocaleDateString(),
        }));
        setTasks(mappedTasks);
      })
      .catch((error) => {
        console.error('ошибончик', error);
      });
  }),
    [setTasks]);
  return null;
}
export default LoadInitialTasks;
