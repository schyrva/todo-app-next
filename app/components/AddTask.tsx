"use client";
import { HiOutlinePlus } from "react-icons/hi";
import Modal from "./Modal";
import { useState } from "react";
import { addTodo } from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ITask } from "@/types/tasks";

const AddTask = () => {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");

  const { mutate } = useMutation({
    mutationFn: addTodo,
    onMutate: async (newTodo) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const previousTodos = queryClient.getQueryData<ITask[]>(["todos"]);
      
      const optimisticTodo = {
        ...newTodo,
        id: Date.now(),
      };

      queryClient.setQueryData<ITask[]>(["todos"], (old) => [
        ...(old || []),
        optimisticTodo,
      ]);

      return { previousTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskValue) return;
    
    mutate({
      title: newTaskValue,
      completed: false,
      userId: 1,
    });
    
    setNewTaskValue("");
    setModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-primary w-full"
      >
        Add new task <HiOutlinePlus className="ml-2" size={16} />
      </button>

      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmit}>
          <h3 className="font-bold text-lg">Add new task</h3>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
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
    </div>
  );
};

export default AddTask;