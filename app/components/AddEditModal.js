// components/AddEditModal.js
import { Modal, Button, Form } from 'react-bootstrap';

const AddEditModal = ({ show, handleClose, onSave, country }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = Object.fromEntries(formData.entries());
    onSave(newData);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{country ? 'Edit Country' : 'Add Country'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formCountryName">
            <Form.Label>Country Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter country name"
              defaultValue={country ? country.name : ''}
              name="name"
              required
            />
          </Form.Group>
          <Form.Group controlId="formPhoneCode">
            <Form.Label>Phone Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter phone code"
              defaultValue={country ? country.phone : ''}
              name="phone"
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditModal;
