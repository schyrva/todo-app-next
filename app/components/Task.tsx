"use client";
import { ITask } from "@/types/tasks";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import { deleteTodo, editTodo } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Task = ({ task }: { task: ITask }) => {
  const queryClient = useQueryClient();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(task.title);

  const editMutation = useMutation({
    mutationFn: editTodo,
    onMutate: async (updatedTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<ITask[]>(["todos"]);
      
      queryClient.setQueryData<ITask[]>(["todos"], (old) =>
        old?.map((todo) => todo.id === updatedTodo.id ? updatedTodo : todo)
      );
      
      return { previousTodos };
    },
    onError: (err, updatedTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<ITask[]>(["todos"]);
      
      queryClient.setQueryData<ITask[]>(["todos"], (old) =>
        old?.filter((todo) => todo.id !== id)
      );
      
      return { previousTodos };
    },
    onError: (err, id, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    editMutation.mutate({
      ...task,
      title: taskToEdit,
    });
    setOpenModalEdit(false);
  };

  return (
    <tr key={task.id}>
      <td className="w-full">{task.title}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          className="cursor-pointer text-blue-500"
          size={18}
        />
        <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleEdit}>
            <h3 className="font-bold text-lg">Edit task</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
              />
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          className="cursor-pointer text-red-500"
          size={18}
        />
        <Modal modalOpen={openModalDelete} setModalOpen={setOpenModalDelete}>
          <h3 className="font-bold text-lg">Delete Task</h3>
          <p className="py-4">Are you sure you want to delete this task?</p>
          <div className="modal-action">
            <button
              className="btn btn-ghost"
              onClick={() => setOpenModalDelete(false)}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={() => deleteMutation.mutate(task.id)}
            >
              Delete
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;