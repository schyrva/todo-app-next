"use client";
import { useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import Modal from "./Modal";
import { useAddTodo } from "@/hooks/useTodos";

const AddTask = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newTaskValue, setNewTaskValue] = useState("");
  const { mutate: addTodo } = useAddTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskValue) return;
    
    addTodo({
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
        aria-label="Add new task"
      >
        Add new task <HiOutlinePlus className="ml-2" size={16} />
      </button>

      <Modal 
        modalOpen={modalOpen} 
        setModalOpen={setModalOpen}
        title="Add new task"
      >
        <form onSubmit={handleSubmit}>
          <div className="modal-action">
            <input
              value={newTaskValue}
              onChange={(e) => setNewTaskValue(e.target.value)}
              type="text"
              placeholder="Type task here"
              className="input input-bordered w-full"
              required
              autoFocus
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
