import React from "react";

interface ErrorModalProps {
  show: boolean;
  message: string | null;
  onClose: () => void;
}

const ErrorModal: React.FC<ErrorModalProps> = ({ show, message, onClose }) => {
  if (!show || !message) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white border border-red-400 rounded shadow-lg p-6 text-center">
        <div className="text-red-600 font-bold mb-2">Allocation Error</div>
        <div className="mb-4">{message}</div>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      />
    </div>
  );
};

export default ErrorModal;