//DemoApiCalls.jsx (не используется в интерфейсе, только для демонстрации)

import { useEffect } from 'react';
import axios from 'axios';

function DemoApiCalls() {
  useEffect(() => {
    // GET
    axios
      .get('https:jsonplaceholder.typicode.com/todos')
      .then((res) => console.log('GET /todos:', res.data))
      .catch((err) => console.error(err));
    // POST
    axios
      .post('https:jsonplaceholder.typicode.com/todos', {
        title: 'Новая задача',
        completed: false,
      })
      .then((res) => console.log('POST /todos:', res.data))
      .catch((err) => console.error(err));
    // DELETE
    axios
      .delete('https:jsonplaceholder.typicode.com/todos/1')
      .then(() => console.log('DELETE /todos/1: успешно удалено'))
      .catch((err) => console.error(err));
  }, []);

  return null;
}

export default DemoApiCalls;
