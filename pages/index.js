// pages/index.js
import { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import countryData from '../public/countries.json';

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    setCountries(countryData);
  }, []);

  const handleSort = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleDelete = () => {
    const updatedCountries = countries.filter(country => country.id !== selectedCountry.id);
    setCountries(updatedCountries);
    setShowModal(false);
  };

  const handleEdit = country => {
    setSelectedCountry(country);
    setShowModal(true);
  };

  const handleSave = newData => {
    if (selectedCountry) {
      const updatedCountries = countries.map(country =>
        country.id === selectedCountry.id ? { ...country, ...newData } : country
      );
      setCountries(updatedCountries);
    } else {
      const newCountry = { ...newData, id: Date.now() };
      setCountries([...countries, newCountry]);
    }

    setShowModal(false);
  };

  return (
    <Container>
      <h1>Country List</h1>
      <input
        type="text"
        placeholder="Search by country name"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th onClick={handleSort}>Country Name</th>
            <th>Phone Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {countries
            .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .sort((a, b) => (sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
            .map(country => (
              <tr key={country.id}>
                <td>{country.name}</td>
                <td>{country.phone}</td>
                <td>
                  <Button variant="info" onClick={() => handleEdit(country)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => setShowModal(true)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedCountry ? 'Edit Country' : 'Add Country'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={e => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const newData = Object.fromEntries(formData.entries());
              handleSave(newData);
            }}
          >
            <Form.Group controlId="formCountryName">
              <Form.Label>Country Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country name"
                defaultValue={selectedCountry ? selectedCountry.name : ''}
                name="name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formPhoneCode">
              <Form.Label>Phone Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone code"
                defaultValue={selectedCountry ? selectedCountry.phone : ''}
                name="phone"
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
            {selectedCountry && (
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Home;
