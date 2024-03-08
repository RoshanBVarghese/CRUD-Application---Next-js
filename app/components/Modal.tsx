import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import 'bootstrap/dist/css/bootstrap.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (country: Country) => void;
  initialCountry?: Country | null;
}

interface Country {
  id: number;
  sortname: string;
  name: string;
  phoneCode: number;
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, onClose, onSave, initialCountry }) => {
  const initialCountryState: Country = {
    id: 0,
    sortname: '',
    name: '',
    phoneCode: 0,
  };

  const [country, setCountry] = useState<Country>(initialCountryState);

  const [errors, setErrors] = useState<{ [key in keyof Country]: string }>({
    id: '',
    sortname: '',
    name: '',
    phoneCode: '',
  });

  useEffect(() => {
    setCountry((prevCountry) => ({
      ...prevCountry,
      ...(initialCountry || {}),
    }));
  }, [initialCountry]);

  const validateFields = () => {
    const newErrors: { [key in keyof Country]: string } = {
      id: '',
      sortname: '',
      name: '',
      phoneCode: '',
    };

    // Validate name
    if (!country.name.trim()) {
      newErrors.name = 'Please enter the country name.';
    }

    // Validate sortname
    if (!country.sortname.trim()) {
      newErrors.sortname = 'Please enter the sortname.';
    }

    // Validate phoneCode
    if (country.phoneCode === 0) {
      newErrors.phoneCode = 'Please enter a valid phone code.';
    }

    setErrors(newErrors);

    // Check if there are no errors
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSave = () => {
    if (validateFields()) {
      onSave(country);
      onClose();
    }
  };

  const handleCancel = () => {
    setCountry(initialCountryState);
    setErrors({
      id: '',
      sortname: '',
      name: '',
      phoneCode: '',
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => handleCancel()}
      contentLabel="Add/Edit Country Modal"
      className="custom-modal"
      overlayClassName="custom-overlay"
    >
      <div className="modal-content">
        <div className="close-button" onClick={handleCancel}>
          &times; {/* This is the 'X' character for close */}
        </div>
        <h2>{initialCountry ? 'Edit' : 'Add'} Country</h2>

        <div className="form-row">
          <label>
            Country Name:
            <input
              type="text"
              value={country.name}
              onChange={(e) => setCountry({ ...country, name: e.target.value })}
            />
            <span className="error-message" style={{ color: 'red' }}>
              {errors.name}
            </span>
          </label>
          <label>
            Sortname:
            <input
              type="text"
              value={country.sortname}
              onChange={(e) => setCountry({ ...country, sortname: e.target.value })}
            />
            <span className="error-message" style={{ color: 'red' }}>
              {errors.sortname}
            </span>
          </label>
          <label>
            Phone Code:
            <input
              type="number"
              value={country.phoneCode}
              onChange={(e) => setCountry({ ...country, phoneCode: parseInt(e.target.value) || 0 })}
            />
            <span className="error-message" style={{ color: 'red' }}>
              {errors.phoneCode}
            </span>
          </label>
        </div>

        <div className="button-container mt-4">
          <button className="btn btn-success mr-2" onClick={handleSave}>
            Save
          </button>
          <button className="btn btn-warning" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
