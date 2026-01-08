// 18

import { Modal } from "./Modal";

export const ConfirmDeleteModal = ({
  isOpen,
  employee,
  onConfirm,
  onCancel,
}) => {
  if (!employee) return null;

  return (
    <Modal isOpen={isOpen} title="Confirm Delete" onClose={onCancel}>
      <p className="text-sm text-slate-600 mb-6">
        Are you sure you want to delete{" "}
        <span className="font-medium text-slate-800">
          {employee.firstName} {employee.lastName}
        </span>
        ? This action cannot be undone.
      </p>

      <div className="flex justify-end gap-3">
        <button onClick={onCancel} className="px-4 py-2 border rounded-lg">
          Cancel
        </button>
        <button
          onClick={() => onConfirm(employee.id)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Delete
        </button>
      </div>
    </Modal>
  );
};
