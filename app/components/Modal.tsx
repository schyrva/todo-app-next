"use client";

interface ModalProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  modalOpen, 
  setModalOpen, 
  children,
  title 
}) => {
  return (
    <div className={`modal ${modalOpen ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          onClick={() => setModalOpen(false)}
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        {title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
        {children}
      </div>
    </div>
  );
};

export default Modal;