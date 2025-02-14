import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllTodos, addTodo, editTodo, deleteTodo } from "@/api";

export const TODO_QUERY_KEY = "todos";

export const useTodos = () => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: getAllTodos,
  });
};

const commonMutationOptions = {
  onError: (error: Error) => console.error("Mutation error:", error),
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...commonMutationOptions,
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });
};

export const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...commonMutationOptions,
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...commonMutationOptions,
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [TODO_QUERY_KEY] });
    },
  });
};