import { ITask } from "./types/tasks";

const baseUrl = "https://jsonplaceholder.typicode.com";

export const getAllTodos = async (): Promise<ITask[]> => {
  try {
    const localData = localStorage.getItem('todos');
    if (localData) return JSON.parse(localData);

    const response = await fetch(`${baseUrl}/todos?_limit=10`);
    if (!response.ok) throw new Error("Failed to fetch todos");
    const todos = await response.json();
    localStorage.setItem('todos', JSON.stringify(todos));
    return todos;
  } catch (error) {
    console.error("Error fetching todos:", error);
    throw error;
  }
};

export const addTodo = async (todo: Omit<ITask, "id">): Promise<ITask> => {
  try {
    const localTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    const newTodo = { ...todo, id: Date.now() };
    const updatedTodos = [newTodo, ...localTodos];
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    return newTodo;
  } catch (error) {
    console.error("Error adding todo:", error);
    throw error;
  }
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  try {
    const localTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    const updatedTodos = localTodos.map((t: ITask) => 
      t.id === todo.id ? todo : t
    );
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    return todo;
  } catch (error) {
    console.error("Error updating todo:", error);
    throw error;
  }
};

export const deleteTodo = async (id: number): Promise<void> => {
  try {
    const localTodos = JSON.parse(localStorage.getItem('todos') || '[]');
    const updatedTodos = localTodos.filter((t: ITask) => t.id !== id);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  } catch (error) {
    console.error("Error deleting todo:", error);
    throw error;
  }
};