"use client"
import React, { useState } from 'react';
import Modal from './Modal';
import useCountries from './useCountries';
import Pagination from './Pagination';
import 'bootstrap/dist/css/bootstrap.css';
import DeleteConfirmationModal from './DeleteModal';


interface Country {
  id: number;
  sortname: string;
  name: string;
  phoneCode: number;
}

const List: React.FC = () => {
  const { countries, setCountries } = useCountries();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editCountry, setEditCountry] = useState<Country | null>(null);
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const ITEMS_PER_PAGE = 5;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditCountry(null);
  };

  const openDeleteConfirmation = (country: Country) => {
    setCountryToDelete(country);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setCountryToDelete(null);
    setIsDeleteConfirmationOpen(false);
  };

  const handleSave = (editedCountry: Country) => {
    // If it's a new country (not editing)
    if (!editCountry) {
      // Dynamically set the id for the new country based on alphabetical order
      const newId = countries.length + 1;

      // Assuming useCountries returns a function to add a country
      setCountries((prevCountries) => {
        const newCountry = { ...editedCountry, id: newId };
        const sortedCountries = [...prevCountries, newCountry].sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        return sortedCountries.map((country, index) => ({
          ...country,
          id: index + 1,
        }));
      });
    } else {
      // If it's an edited country
      setCountries((prevCountries) =>
        prevCountries.map((country) =>
          country.id === editedCountry.id ? editedCountry : country
        )
      );
    }

    closeModal();
  };

  const handleDelete = () => {
    if (countryToDelete) {
      // Assuming useCountries returns a function to remove a country
      setCountries((prevCountries) =>
        prevCountries.filter((country) => country.id !== countryToDelete.id)
      );

      closeDeleteConfirmation();
    }
  };

  const handleEdit = (country: Country) => {
    setEditCountry(country);
    openModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCountries = filteredCountries.sort((a, b) => {
    const comparison = sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    return comparison;
  });

  const totalPages = Math.ceil(sortedCountries.length / ITEMS_PER_PAGE);
  const paginatedCountries = sortedCountries.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="container mx-auto p-8 bg-lightblue">
      <h1 className="text-center mb-8" style={{color:'lightblue'}}><b>COUNTRY LIST</b></h1>
      <div className="flex items-center justify-between mb-4">
        <button className='btn-add-country' onClick={() => openModal()}>Add Country</button>
        <div className="animated-search-bar" style={{ textAlign: 'center' }}>
          <input
            type="text"
            placeholder="Search countries"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            style={{ width: '300px', padding: '10px', fontSize: '16px' }}
          />
          <button className='btn btn-outline' style={{ marginLeft: '10px', borderRadius: '20px',color:'white' }}>
            Sort by Name: 
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              style={{color:'black'}}
            >
              <option value="asc">Asc</option>
              <option value="desc">Desc</option>
            </select>
          </button>

        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Sort Name</th>
              <th>Phone Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCountries.map((country) => (
              <tr className='hover' key={country.id}>
                <td>{country.id}</td>
                <td>{country.name}</td>
                <td>{country.sortname}</td>
                <td>{country.phoneCode}</td>
                <td>
                  <button className="btn-edit" onClick={() => handleEdit(country)}>Edit</button>
                  <button className="btn-delete" onClick={() => openDeleteConfirmation(country)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      <Modal isOpen={isModalOpen} onClose={closeModal} onSave={handleSave} initialCountry={editCountry} />
      <DeleteConfirmationModal
        isOpen={isDeleteConfirmationOpen}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDelete}
        itemName={countryToDelete?.name || ''}
      />
    </div>
  );
};

export default List;
