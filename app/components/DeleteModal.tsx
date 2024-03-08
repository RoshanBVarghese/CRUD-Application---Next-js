import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemName: string;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  itemName,
}) => {
  return (
    <div className={isOpen ? 'delete-confirmation-modal' : 'hidden'}>
      {isOpen && (
        <div className="delete-confirmation-content">
          <p>Are you sure you want to delete {itemName}?</p>
          <div className="button-container">
            <button onClick={onConfirm} className="delete-button">
              Yes
            </button>
            <button onClick={onClose} className="cancel-button">
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteConfirmationModal;
