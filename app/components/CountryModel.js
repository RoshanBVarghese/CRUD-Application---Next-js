// components/CountryModal.js
import { Modal, Button, Form } from 'react-bootstrap';

const CountryModal = ({ show, handleClose, handleSubmit, country }) => {
  const [name, setName] = useState(country ? country.name : '');
  const [phone, setPhone] = useState(country ? country.phone : '');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      name,
      phone,
      // Add other fields as needed
    };
    handleSubmit(formData);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{country ? 'Edit Country' : 'Add Country'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Country Name</Form.Label>
            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="formPhone">
            <Form.Label>Phone Code</Form.Label>
            <Form.Control type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </Form.Group>
          {/* Add other form fields as needed */}
          <Button variant="primary" type="submit">
            {country ? 'Update' : 'Add'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CountryModal;
