export interface ITask {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

export const getAllTodos = async (): Promise<ITask[]> => {
  const response = await fetch(`${API_URL}?_limit=10`);
  if (!response.ok) throw new Error('Failed to fetch todos');
  return response.json();
};

export const addTodo = async (todo: Omit<ITask, 'id'>): Promise<ITask> => {
  const response = await fetch(API_URL, {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to add todo');
  return response.json();
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (!response.ok) throw new Error('Failed to update todo');
  return response.json();
};

export const deleteTodo = async (id: number): Promise<void> => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete todo');
};