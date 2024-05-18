import React, { useState } from 'react';
import '../styles/record-box.css';
import { generateHash } from '../utils/hash.utils';

const DeleteRecordForm = () => {
  const [searchCriteria, setSearchCriteria] = useState({
    name: '',
    email: '',
    mobile_number: '',
    date_of_birth: '',
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Remove empty fields from search criteria
    Object.keys(searchCriteria).forEach(
      (key) =>
        searchCriteria[key as keyof typeof searchCriteria] === '' &&
        delete searchCriteria[key as keyof typeof searchCriteria]
    );

    const hash = generateHash(searchCriteria);

    try {
      // Send DELETE request with search criteria
      await fetch('http://localhost:3000/v1/entity/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Hash': hash,
        },
        body: JSON.stringify({
          searchCriteria,
        }),
      });
      alert('Record deleted successfully!');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  return (
    <div className="record-form-container">
      <div className="tab">Delete Record</div>
      <form onSubmit={handleSubmit}>
        <div className="side-by-side-inputs">
          <div className="form-group form-group-side-by-side">
            <label>Search Criteria:</label>
            <input
              type="text"
              value={searchCriteria.name}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, name: e.target.value })
              }
              placeholder="Name"
            />
            <input
              type="email"
              value={searchCriteria.email}
              onChange={(e) =>
                setSearchCriteria({ ...searchCriteria, email: e.target.value })
              }
              placeholder="Email"
            />
            <input
              type="tel"
              value={searchCriteria.mobile_number}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  mobile_number: e.target.value,
                })
              }
              placeholder="Mobile Number"
            />
            <div className="form-group form-group-side-by-side">
            <input
              type="date"
              value={searchCriteria.date_of_birth}
              onChange={(e) =>
                setSearchCriteria({
                  ...searchCriteria,
                  date_of_birth: e.target.value,
                })
              }
              placeholder="Date of Birth"
            />
            </div>
          </div>
        </div>
        <button type="submit" className="submit-button">Continue</button>
      </form>
    </div>
  );
};

export default DeleteRecordForm;
