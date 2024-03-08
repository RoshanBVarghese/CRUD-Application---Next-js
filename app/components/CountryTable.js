// components/CountryTable.js
import { Table, Button } from 'react-bootstrap';

const CountryTable = ({ countries, onDelete, onEdit }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Country Name</th>
          <th>Phone Code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country) => (
          <tr key={country.name}>
            <td>{country.name}</td>
            <td>{country.phone}</td>
            <td>
              <Button variant="info" onClick={() => onEdit(country)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(country.name)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CountryTable;
