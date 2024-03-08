import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const visiblePages = 5; // Number of pages to display

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  return (
    <div className="flex items-center justify-center mt-4" >
      <button
        className="btn btn-outline btn-primary mr-2"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={startPage + index}
          style={{
            margin: '0 2px',
            padding: '8px 12px',
            border: '1px solid #007bff',
            borderRadius:'7px',
            color: currentPage === startPage + index ? '#fff' : '#007bff',
            backgroundColor: currentPage === startPage + index ? '#007bff' : 'transparent',
          }}
          onClick={() => onPageChange(startPage + index)}
        >
          {startPage + index}
        </button>
      ))}
      <button
        className="btn btn-outline btn-primary ml-2"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
