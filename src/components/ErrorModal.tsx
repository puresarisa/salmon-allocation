import React from "react";

interface ErrorModalProps {
  show: boolean;
  message: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, message, onClose }) => {
  if (!show || !message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-white border rounded-xl shadow-lg p-6 z-10">
        <div className="text-red-600 font-semibold mb-2 text-xl">Allocation Error</div>
        <div className="mb-4 text-sm text-gray-500">{message}</div>
        <div className="flex justify-end">
          <button
            className="mt-3 px-3 py-2 bg-red-600 text-white text-sm rounded-md border-none hover:bg-red-700"
            onClick={onClose}
          >
          Close
        </button>
        </div>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-10"
        onClick={onClose}
      />
    </div>
  );
};

export default ErrorModal;