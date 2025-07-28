import { useState, useEffect } from 'react';
import axios from 'axios';

function TodoFetcher() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);

  (useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        setError('не удалось загрузить задачи');
        console.error(error);
      });
  }),
    []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Тест: Загрузка задач</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <strong>{todo.title}</strong>{' '}
            {todo.completed ? 'Выполнено' : 'Не выполнено'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoFetcher;
