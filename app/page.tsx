"use client";
import { useQuery } from "@tanstack/react-query";
import { getAllTodos } from "@/api";
import AddTask from "./components/AddTask";
import TodoList from "./components/TodoList";


export default function Home() {
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError) return <p className="text-center mt-4">Error loading tasks.</p>;

  return (
    <main className="max-w-4xl mx-auto mt-4 border border-gray-300 rounded-lg p-4 shadow-md">
      <div className="text-center my-5 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <AddTask />
      </div>
      <TodoList tasks={tasks} />
    </main>
  );
}
