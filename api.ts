import type { ITask } from "./types/tasks";

const LOCAL_STORAGE_KEY = 'todos';

export const getAllTodos = async (): Promise<ITask[]> => {
  const localData = localStorage.getItem(LOCAL_STORAGE_KEY);
  return localData ? JSON.parse(localData) : [];
};

export const addTodo = async (todo: Omit<ITask, "id">): Promise<ITask> => {
  const todos = await getAllTodos();
  const newTodo = { ...todo, id: Date.now() };
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newTodo, ...todos]));
  return newTodo;
};

export const editTodo = async (updatedTodo: ITask): Promise<ITask> => {
  const todos = await getAllTodos();
  const updatedTodos = todos.map(todo => 
    todo.id === updatedTodo.id ? updatedTodo : todo
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTodos));
  return updatedTodo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  const todos = await getAllTodos();
  const filteredTodos = todos.filter(todo => todo.id !== id);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(filteredTodos));
};