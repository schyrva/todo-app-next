import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAllTodos, addTodo, editTodo, deleteTodo, ITask } from '@/api';

export const TODO_QUERY_KEY = 'todos';

export const useTodos = () => {
  return useQuery({
    queryKey: [TODO_QUERY_KEY],
    queryFn: getAllTodos,
  });
};

const handleOptimisticUpdate = async (
  queryClient: ReturnType<typeof useQueryClient>,
  updater: (oldData: ITask[]) => ITask[]
) => {
  await queryClient.cancelQueries({ queryKey: [TODO_QUERY_KEY] });
  const previousTodos = queryClient.getQueryData<ITask[]>([TODO_QUERY_KEY]) || [];
  queryClient.setQueryData([TODO_QUERY_KEY], updater(previousTodos));
  return { previousTodos };
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      return handleOptimisticUpdate(queryClient, (old) => [
        { ...newTodo, id: Date.now() },
        ...old,
      ]);
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([TODO_QUERY_KEY], context?.previousTodos);
    },
  });
};

export const useEditTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editTodo,
    onMutate: async (updatedTodo) => {
      return handleOptimisticUpdate(queryClient, (old) =>
        old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([TODO_QUERY_KEY], context?.previousTodos);
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      return handleOptimisticUpdate(queryClient, (old) =>
        old.filter((todo) => todo.id !== id)
      );
    },
    onError: (err, _, context) => {
      queryClient.setQueryData([TODO_QUERY_KEY], context?.previousTodos);
    },
  });
};