"use client";
import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import Modal from "./Modal";
import type { ITask } from "@/types/tasks";
import { useEditTodo, useDeleteTodo } from "@/hooks/useTodos";

const Task = ({ task }: { task: ITask }) => {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [taskTitle, setTaskTitle] = useState(task.title);

  const { mutate: editTodo } = useEditTodo();
  const { mutate: deleteTodo } = useDeleteTodo();

  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    editTodo({ ...task, title: taskTitle });
    setOpenModalEdit(false);
  };

  return (
    <tr key={task.id} className="hover:bg-gray-100 transition-colors">
      <td className="w-full">{task.title}</td>
      <td className="flex gap-5">
        <FiEdit
          onClick={() => {
            setTaskTitle(task.title);
            setOpenModalEdit(true);
          }}
          className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors"
          size={18}
          aria-label="Edit task"
        />

        <Modal
          modalOpen={openModalEdit}
          setModalOpen={setOpenModalEdit}
          title="Edit task"
        >
          <form onSubmit={handleEdit}>
            <div className="modal-action">
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                type="text"
                className="input input-bordered w-full"
                required
                autoFocus
              />
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </Modal>

        <FiTrash2
          onClick={() => setOpenModalDelete(true)}
          className="cursor-pointer text-red-500 hover:text-red-700 transition-colors"
          size={18}
          aria-label="Delete task"
        />

        <Modal
          modalOpen={openModalDelete}
          setModalOpen={setOpenModalDelete}
          title="Delete Task"
        >
          <div className="flex flex-col gap-4">
            <p>Are you sure you want to delete this task?</p>
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-ghost"
                onClick={() => setOpenModalDelete(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={() => deleteTodo(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
